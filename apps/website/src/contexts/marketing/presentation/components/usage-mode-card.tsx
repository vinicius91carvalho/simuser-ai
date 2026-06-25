"use client";

import { cn } from "@simuser/ui";
import type { ReactNode } from "react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface UsageModeCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	disabled?: boolean;
	className?: string;
	delay?: number;
}

export function UsageModeCard({
	icon,
	title,
	description,
	disabled = false,
	className,
	delay = 0,
}: UsageModeCardProps) {
	return (
		<AnimateOnScroll variant="fade-up" delay={delay} className="h-full">
			<div
				className={cn(
					"group relative h-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300",
					disabled
						? "opacity-60"
						: "hover:border-[hsl(var(--secondary)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--secondary)/0.1)] hover:-translate-y-1",
					className,
				)}
			>
				{disabled && (
					<span className="absolute top-3 right-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
						Coming Soon
					</span>
				)}
				<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--secondary)/0.1)] text-[hsl(var(--secondary))]">
					{icon}
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
