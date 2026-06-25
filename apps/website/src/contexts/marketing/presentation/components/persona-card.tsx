"use client";

import { cn } from "@simuser/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

interface PersonaCardProps {
	personaKey: string;
	icon: string;
	accentColor: string;
	delay?: number;
}

export function PersonaCard({
	personaKey,
	icon,
	accentColor,
	delay = 0,
}: PersonaCardProps) {
	const t = useTranslations(`marketing.home.personas.${personaKey}`);
	const labels = useTranslations("marketing.home.personas.labels");
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<AnimateOnScroll variant="fade-up" delay={delay}>
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className={cn(
					"group w-full cursor-pointer rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-left transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.05)]",
					isExpanded &&
						"border-[hsl(var(--primary)/0.5)] shadow-lg shadow-[hsl(var(--primary)/0.05)]",
				)}
			>
				{/* Header */}
				<div className="mb-3 flex items-center gap-3">
					<div
						className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
						style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
					>
						{icon}
					</div>
					<div>
						<h3 className="font-semibold text-[hsl(var(--foreground))]">
							{t("name")}
						</h3>
					</div>
				</div>

				{/* Quick stats */}
				<div className="mb-3 flex gap-4">
					<div>
						<span className="text-xs text-[hsl(var(--muted-foreground))]">
							{labels("techSavviness")}
						</span>
						<p className="text-sm font-medium text-[hsl(var(--foreground))]">
							{t("techSavviness")}
						</p>
					</div>
					<div>
						<span className="text-xs text-[hsl(var(--muted-foreground))]">
							{labels("patience")}
						</span>
						<p className="text-sm font-medium text-[hsl(var(--foreground))]">
							{t("patience")}
						</p>
					</div>
				</div>

				{/* Expanded details */}
				<div
					className={cn(
						"overflow-hidden transition-all duration-300",
						isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
					)}
				>
					<div className="space-y-2 border-t border-[hsl(var(--border))] pt-3">
						<div>
							<span className="text-xs font-medium text-[hsl(var(--accent))]">
								{labels("goals")}
							</span>
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								{t("goals")}
							</p>
						</div>
						<div>
							<span className="text-xs font-medium text-[hsl(var(--destructive))]">
								{labels("frustrations")}
							</span>
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								{t("frustrations")}
							</p>
						</div>
					</div>
				</div>

				{/* Expand indicator */}
				<div className="mt-2 text-center">
					<span className="text-xs text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--primary))]">
						{isExpanded ? "Show less" : "Show more"}
					</span>
				</div>
			</button>
		</AnimateOnScroll>
	);
}
