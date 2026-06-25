"use client";

import { cn } from "@simuser/ui";
import type { LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface FeatureCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: string;
	delay?: number;
}

export function FeatureCard({
	icon: Icon,
	title,
	description,
	className,
	delay = 0,
}: FeatureCardProps) {
	return (
		<AnimateOnScroll variant="fade-up" delay={delay}>
			<div
				className={cn(
					"group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:-translate-y-1",
					className,
				)}
			>
				<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-colors group-hover:bg-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))]">
					<Icon className="h-6 w-6" />
				</div>
				<h3 className="mb-2 text-lg font-semibold text-[hsl(var(--foreground))]">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
					{description}
				</p>
			</div>
		</AnimateOnScroll>
	);
}
