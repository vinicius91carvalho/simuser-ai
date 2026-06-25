"use client";

import { cn } from "@simuser/ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

const heroVariants = cva("relative overflow-hidden py-20 sm:py-28 lg:py-32", {
	variants: {
		variant: {
			dark: "bg-[hsl(var(--background))]",
			light: "bg-[hsl(var(--muted))]",
		},
	},
	defaultVariants: {
		variant: "dark",
	},
});

interface HeroSectionProps extends VariantProps<typeof heroVariants> {
	badge?: string;
	title: string;
	subtitle?: string;
	primaryCTA?: {
		label: string;
		onClick?: () => void;
		href?: string;
	};
	secondaryCTA?: {
		label: string;
		onClick?: () => void;
		href?: string;
	};
	children?: ReactNode;
	className?: string;
}

export function HeroSection({
	variant,
	badge,
	title,
	subtitle,
	primaryCTA,
	secondaryCTA,
	children,
	className,
}: HeroSectionProps) {
	return (
		<section className={cn(heroVariants({ variant }), className)}>
			{/* Decorative gradient orbs */}
			<div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl" />
			<div className="pointer-events-none absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-[hsl(var(--accent)/0.06)] blur-3xl" />

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					{badge && (
						<AnimateOnScroll variant="fade-in">
							<div className="mb-6 inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-1.5 text-sm text-[hsl(var(--muted-foreground))]">
								<span className="mr-2 inline-block h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
								{badge}
							</div>
						</AnimateOnScroll>
					)}

					<AnimateOnScroll variant="fade-up" delay={100}>
						<h1 className="mb-6 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
							{title}
						</h1>
					</AnimateOnScroll>

					{subtitle && (
						<AnimateOnScroll variant="fade-up" delay={200}>
							<p className="mx-auto mb-10 max-w-2xl text-lg text-[hsl(var(--muted-foreground))] sm:text-xl">
								{subtitle}
							</p>
						</AnimateOnScroll>
					)}

					{(primaryCTA || secondaryCTA) && (
						<AnimateOnScroll variant="fade-up" delay={300}>
							<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
								{primaryCTA && (
									<button
										type="button"
										onClick={primaryCTA.onClick}
										className="animate-button-glow inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-8 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] shadow-lg transition-all hover:opacity-90"
									>
										{primaryCTA.label}
									</button>
								)}
								{secondaryCTA && (
									<button
										type="button"
										onClick={secondaryCTA.onClick}
										className="inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-transparent px-8 py-3 text-base font-semibold text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))]"
									>
										{secondaryCTA.label}
									</button>
								)}
							</div>
						</AnimateOnScroll>
					)}
				</div>

				{/* Children slot for custom content below hero text */}
				{children && (
					<AnimateOnScroll variant="scale-up" delay={400}>
						<div className="mt-12">{children}</div>
					</AnimateOnScroll>
				)}
			</div>
		</section>
	);
}
