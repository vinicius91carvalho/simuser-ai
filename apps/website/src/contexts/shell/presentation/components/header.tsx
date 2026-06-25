"use client";

import { cn } from "@simuser/ui";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { type Locale, localeNames, locales } from "@/lib/i18n/config";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { LogoMark } from "./logo-mark";

const navLinks = [
	{ key: "product", href: "/product" },
	{ key: "pricing", href: "/pricing" },
	{ key: "compare", href: "/compare" },
] as const;

export function Header({ locale }: { locale: Locale }) {
	const t = useTranslations("shell.nav");
	const tLang = useTranslations("shell.language");
	const pathname = usePathname();
	const router = useRouter();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isLangOpen, setIsLangOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.body.style.overflow = "";
		};
	}, []);

	const toggleMobile = useCallback(() => {
		setIsMobileOpen((prev) => {
			const next = !prev;
			document.body.style.overflow = next ? "hidden" : "";
			return next;
		});
	}, []);

	const closeMobile = useCallback(() => {
		setIsMobileOpen(false);
		document.body.style.overflow = "";
	}, []);

	const switchLocale = useCallback(
		(newLocale: Locale) => {
			router.replace(pathname, { locale: newLocale });
			setIsLangOpen(false);
		},
		[pathname, router],
	);

	return (
		<>
			<header
				className={cn(
					"fixed top-0 right-0 left-0 z-50 transition-all duration-300",
					isScrolled || isMobileOpen
						? "border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] backdrop-blur-xl"
						: "bg-transparent",
				)}
			>
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 text-xl font-bold">
						<LogoMark size={28} className="shrink-0" />
						<span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
							SimUser
						</span>
						<span className="text-[hsl(var(--foreground))]">AI</span>
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.key}
								href={link.href}
								className={cn(
									"rounded-lg px-3 py-2 text-sm font-medium transition-colors",
									pathname === link.href
										? "text-[hsl(var(--primary))]"
										: "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
								)}
							>
								{t(link.key)}
							</Link>
						))}
					</nav>

					{/* Desktop Actions */}
					<div className="hidden items-center gap-3 md:flex">
						{/* Language Selector */}
						<div className="relative">
							<button
								type="button"
								onClick={() => setIsLangOpen(!isLangOpen)}
								className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
								aria-label={tLang("label")}
							>
								<Globe className="h-4 w-4" />
								<span className="hidden sm:inline">{localeNames[locale]}</span>
							</button>
							{isLangOpen && (
								<div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--popover))] py-1 shadow-lg">
									{locales.map((loc) => (
										<button
											key={loc}
											type="button"
											onClick={() => switchLocale(loc)}
											className={cn(
												"flex w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[hsl(var(--muted))]",
												locale === loc
													? "text-[hsl(var(--primary))]"
													: "text-[hsl(var(--popover-foreground))]",
											)}
										>
											{localeNames[loc]}
										</button>
									))}
								</div>
							)}
						</div>

						{/* CTA */}
						<Link
							href="/get-started"
							className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90"
						>
							{t("getStarted")}
						</Link>
					</div>

					{/* Mobile Hamburger */}
					<button
						type="button"
						onClick={toggleMobile}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[hsl(var(--foreground))] md:hidden"
						aria-label={isMobileOpen ? "Close menu" : "Open menu"}
					>
						{isMobileOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</header>

			{/* Mobile Drawer — rendered outside header to avoid backdrop-filter containing block */}
			{isMobileOpen && (
				<>
					{/* Backdrop */}
					<button
						type="button"
						className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
						onClick={closeMobile}
						onKeyDown={(e) => {
							if (e.key === "Escape") closeMobile();
						}}
						aria-label="Close menu"
					/>
					{/* Drawer */}
					<div className="fixed top-16 right-0 bottom-0 z-50 w-72 border-l border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 md:hidden">
						<nav className="flex flex-col gap-2">
							{navLinks.map((link) => (
								<Link
									key={link.key}
									href={link.href}
									onClick={closeMobile}
									className={cn(
										"rounded-lg px-3 py-3 text-base font-medium transition-colors",
										pathname === link.href
											? "bg-[hsl(var(--muted))] text-[hsl(var(--primary))]"
											: "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
									)}
								>
									{t(link.key)}
								</Link>
							))}
						</nav>

						{/* Language in mobile */}
						<div className="mt-6 border-t border-[hsl(var(--border))] pt-6">
							<p className="mb-2 text-xs font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
								{tLang("label")}
							</p>
							<div className="flex gap-2">
								{locales.map((loc) => (
									<button
										key={loc}
										type="button"
										onClick={() => {
											switchLocale(loc);
											closeMobile();
										}}
										className={cn(
											"rounded-lg px-3 py-2 text-sm transition-colors",
											locale === loc
												? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
												: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
										)}
									>
										{localeNames[loc]}
									</button>
								))}
							</div>
						</div>

						{/* CTA in mobile */}
						<div className="mt-6">
							<Link
								href="/get-started"
								onClick={closeMobile}
								className="flex w-full items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-4 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90"
							>
								{t("getStarted")}
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
}
