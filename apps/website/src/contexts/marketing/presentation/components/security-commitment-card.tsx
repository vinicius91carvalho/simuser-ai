"use client";

import { cn } from "@simuser/ui";
import type { LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface SecurityCommitmentCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: string;
	delay?: number;
}

export function SecurityCommitmentCard({
	icon: Icon,
	title,
	description,
	className,
	delay = 0,
}: SecurityCommitmentCardProps) {
	return (
		<AnimateOnScroll variant="scale-up" delay={delay} className="h-full">
			<div
				className={cn(
					"group relative h-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--accent)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--accent)/0.1)]",
					className,
				)}
			>
				<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))] transition-colors group-hover:bg-[hsl(var(--accent))] group-hover:text-[hsl(var(--accent-foreground))]">
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
