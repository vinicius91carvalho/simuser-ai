"use client";

import { cn } from "@simuser/ui";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface StepCardProps {
	number: number;
	title: string;
	description: string;
	className?: string;
	delay?: number;
	color?: string;
}

export function StepCard({
	number,
	title,
	description,
	className,
	delay = 0,
	color,
}: StepCardProps) {
	const primary = color ?? "hsl(var(--primary))";
	const circleBg = color
		? `color-mix(in srgb, ${color} 10%, transparent)`
		: "hsl(var(--primary)/0.1)";
	const connectorColor = color
		? `color-mix(in srgb, ${color} 30%, transparent)`
		: "hsl(var(--primary)/0.3)";

	// Unique ID per instance so scoped hover styles don't bleed across cards
	const scopeId = `step-${number}`;

	return (
		<AnimateOnScroll variant="fade-left" delay={delay}>
			{/* Scoped hover styles: pure CSS, no JS event handlers */}
			<style>{`
				[data-step="${scopeId}"]:hover .step-circle {
					background-color: ${primary} !important;
					color: hsl(var(--primary-foreground)) !important;
				}
				[data-step="${scopeId}"]:hover .step-title {
					color: ${primary} !important;
				}
			`}</style>
			<div
				data-step={scopeId}
				className={cn("group relative flex gap-4", className)}
			>
				{/* Timeline connector */}
				<div className="flex flex-col items-center">
					<div
						className="step-circle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300"
						style={{
							borderColor: primary,
							backgroundColor: circleBg,
							color: primary,
						}}
					>
						{number}
					</div>
					<div
						className="mt-2 h-full w-px"
						style={{
							backgroundImage: `linear-gradient(to bottom, ${connectorColor}, transparent)`,
						}}
					/>
				</div>

				{/* Content */}
				<div className="pb-8">
					<h3 className="step-title mb-1 text-lg font-semibold text-[hsl(var(--foreground))] transition-colors">
						{title}
					</h3>
					<p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
						{description}
					</p>
				</div>
			</div>
		</AnimateOnScroll>
	);
}
