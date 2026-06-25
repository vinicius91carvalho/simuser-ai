"use client";

import {
	AlertTriangle,
	Camera,
	CheckCircle,
	MessageSquare,
	Video,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

export function ExperienceReportPreview() {
	const t = useTranslations("marketing.home.experienceReport");

	return (
		<div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
			{/* Report header */}
			<div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-6 py-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
							Experience Report
						</h3>
						<p className="text-sm text-[hsl(var(--muted-foreground))]">
							Sign Up Flow - 3 Personas
						</p>
					</div>
					<div className="flex items-center gap-4">
						<AnimateOnScroll variant="scale-up" delay={200}>
							<div className="text-center">
								<p className="text-xs text-[hsl(var(--muted-foreground))]">
									{t("npsLabel")}
								</p>
								<p className="text-2xl font-bold text-[hsl(var(--accent))]">
									7.2
								</p>
							</div>
						</AnimateOnScroll>
						<AnimateOnScroll variant="scale-up" delay={300}>
							<div className="text-center">
								<p className="text-xs text-[hsl(var(--muted-foreground))]">
									{t("gradeLabel")}
								</p>
								<p className="text-2xl font-bold text-[hsl(var(--secondary))]">
									B+
								</p>
							</div>
						</AnimateOnScroll>
					</div>
				</div>
			</div>

			{/* Feedback quotes */}
			<div className="px-6 py-4">
				<h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))]">
					<MessageSquare className="h-4 w-4 text-[hsl(var(--primary))]" />
					{t("feedbackTitle")}
				</h4>

				<div className="space-y-3">
					{[
						{
							quote: t("quote1"),
							author: t("quote1Author"),
							type: "warning",
						},
						{ quote: t("quote2"), author: t("quote2Author"), type: "info" },
						{
							quote: t("quote3"),
							author: t("quote3Author"),
							type: "danger",
						},
					].map((item) => (
						<AnimateOnScroll key={item.author} variant="fade-left" delay={100}>
							<div className="flex gap-3 rounded-lg bg-[hsl(var(--muted))] p-3">
								<div className="mt-0.5 shrink-0">
									{item.type === "warning" && (
										<AlertTriangle className="h-4 w-4 text-[hsl(var(--secondary))]" />
									)}
									{item.type === "info" && (
										<CheckCircle className="h-4 w-4 text-[hsl(var(--accent))]" />
									)}
									{item.type === "danger" && (
										<AlertTriangle className="h-4 w-4 text-[hsl(var(--destructive))]" />
									)}
								</div>
								<div>
									<p className="text-sm text-[hsl(var(--foreground))]">
										&ldquo;{item.quote}&rdquo;
									</p>
									<p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
										- {item.author}
									</p>
								</div>
							</div>
						</AnimateOnScroll>
					))}
				</div>
			</div>

			{/* Report footer - what's included */}
			<div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-6 py-3">
				<div className="flex flex-wrap gap-4">
					<div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
						<Camera className="h-3.5 w-3.5" />
						{t("screenshotsLabel")}
					</div>
					<div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
						<Video className="h-3.5 w-3.5" />
						{t("videoLabel")}
					</div>
					<div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
						<AlertTriangle className="h-3.5 w-3.5" />
						{t("bugsLabel")}
					</div>
				</div>
			</div>
		</div>
	);
}
