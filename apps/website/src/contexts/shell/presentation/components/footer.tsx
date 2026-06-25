"use client";

import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n/config";
import { Link } from "@/lib/i18n/navigation";
import { LogoMark } from "./logo-mark";

const productLinks = [
	{ key: "product", href: "/product" },
	{ key: "pricing", href: "/pricing" },
	{ key: "compare", href: "/compare" },
] as const;

const companyLinks = [{ key: "contact", href: "/get-started" }] as const;

const legalLinks = [
	{ key: "privacy", href: "/privacy" },
	{ key: "terms", href: "/terms" },
] as const;

export function Footer({ locale }: { locale: Locale }) {
	const t = useTranslations("shell.footer");

	const currentYear = new Date().getFullYear();
	const showLGPD = locale === "pt-br";

	return (
		<footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				{/* 4-column grid */}
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
					{/* Brand Column */}
					<div className="col-span-2 md:col-span-1">
						<Link
							href="/"
							className="flex items-center gap-2 text-xl font-bold"
						>
							<LogoMark size={28} className="shrink-0" />
							<span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
								SimUser
							</span>
							<span className="text-[hsl(var(--foreground))]">AI</span>
						</Link>
						<p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
							{t("brand.tagline")}
						</p>
					</div>

					{/* Product Column */}
					<div>
						<h3 className="mb-3 text-sm font-semibold text-[hsl(var(--foreground))]">
							{t("product.title")}
						</h3>
						<ul className="space-y-2">
							{productLinks.map((link) => (
								<li key={link.key}>
									<Link
										href={link.href}
										className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
									>
										{t(`product.${link.key}`)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Column */}
					<div>
						<h3 className="mb-3 text-sm font-semibold text-[hsl(var(--foreground))]">
							{t("company.title")}
						</h3>
						<ul className="space-y-2">
							{companyLinks.map((link) => (
								<li key={link.key}>
									<Link
										href={link.href}
										className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
									>
										{t(`company.${link.key}`)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Column */}
					<div>
						<h3 className="mb-3 text-sm font-semibold text-[hsl(var(--foreground))]">
							{t("legal.title")}
						</h3>
						<ul className="space-y-2">
							{legalLinks.map((link) => (
								<li key={link.key}>
									<Link
										href={link.href}
										className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
									>
										{t(`legal.${link.key}`)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-6 sm:flex-row">
					<p className="text-xs text-[hsl(var(--muted-foreground))]">
						&copy; {currentYear} {t("copyright")}
					</p>
					<div className="flex items-center gap-3">
						{/* Compliance Badges */}
						<span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
							GDPR
						</span>
						<span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
							SOC 2
						</span>
						{showLGPD && (
							<span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] px-2.5 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
								LGPD
							</span>
						)}
						<span className="text-xs text-[hsl(var(--muted-foreground))]">
							{t("builtWith")}
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
