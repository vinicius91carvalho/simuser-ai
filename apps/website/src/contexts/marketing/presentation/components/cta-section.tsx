"use client";

import { cn } from "@simuser/ui";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { SectionLayout } from "./section-layout";

interface CTASectionProps {
	title: string;
	subtitle?: string;
	primaryCTA?: {
		label: string;
		onClick?: () => void;
	};
	secondaryCTA?: {
		label: string;
		onClick?: () => void;
	};
	variant?: "default" | "muted" | "dark";
	className?: string;
}

export function CTASection({
	title,
	subtitle,
	primaryCTA,
	secondaryCTA,
	variant = "dark",
	className,
}: CTASectionProps) {
	return (
		<SectionLayout
			variant={variant}
			className={cn("relative overflow-hidden", className)}
		>
			{/* Decorative gradient */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.05)] to-[hsl(var(--accent)/0.05)]" />

			<div className="relative mx-auto max-w-3xl text-center">
				<AnimateOnScroll variant="fade-up">
					<h2 className="mb-4 text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl">
						{title}
					</h2>
				</AnimateOnScroll>

				{subtitle && (
					<AnimateOnScroll variant="fade-up" delay={100}>
						<p className="mx-auto mb-8 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
							{subtitle}
						</p>
					</AnimateOnScroll>
				)}

				{(primaryCTA || secondaryCTA) && (
					<AnimateOnScroll variant="fade-up" delay={200}>
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
		</SectionLayout>
	);
}
