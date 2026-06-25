"use client";

import { cn } from "@simuser/ui";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface MetricCardProps {
	value: string;
	label: string;
	source: string;
	sourceUrl?: string;
	className?: string;
	delay?: number;
}

export function MetricCard({
	value,
	label,
	source,
	sourceUrl,
	className,
	delay = 0,
}: MetricCardProps) {
	return (
		<AnimateOnScroll variant="fade-up" delay={delay}>
			<div
				className={cn(
					"group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)]",
					className,
				)}
			>
				<p className="mb-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
					{value}
				</p>
				<p className="mb-3 text-sm text-[hsl(var(--foreground))]">{label}</p>
				{sourceUrl ? (
					<a
						href={sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs text-[hsl(var(--muted-foreground))] underline-offset-2 transition-colors hover:text-[hsl(var(--primary))] hover:underline"
					>
						Source: {source}
					</a>
				) : (
					<p className="text-xs text-[hsl(var(--muted-foreground))]">
						Source: {source}
					</p>
				)}
			</div>
		</AnimateOnScroll>
	);
}
