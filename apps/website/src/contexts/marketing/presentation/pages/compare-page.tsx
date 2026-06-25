"use client";

import {
	AlertTriangle,
	Bot,
	CheckCircle,
	FileSearch,
	Palette,
	Shield,
	TestTube,
	Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ContactModal } from "@/contexts/engagement/presentation/components/contact-modal";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { CTASection } from "../components/cta-section";
import { HeroSection } from "../components/hero-section";
import { SectionLayout } from "../components/section-layout";

const competitors = [
	{
		key: "momentic",
		icon: TestTube,
	},
	{
		key: "qaWolf",
		icon: Shield,
	},
	{
		key: "applause",
		icon: Users,
	},
	{
		key: "syntheticUsers",
		icon: Bot,
	},
	{
		key: "blok",
		icon: FileSearch,
	},
	{
		key: "uxia",
		icon: Palette,
	},
	{
		key: "octomind",
		icon: TestTube,
	},
] as const;

export function ComparePageContent() {
	const t = useTranslations("marketing.compare");
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<HeroSection
				badge={t("badge")}
				title={t("heading")}
				subtitle={t("subtitle")}
				primaryCTA={{
					label: t("cta.primary"),
					onClick: () => setIsModalOpen(true),
				}}
			/>

			{/* Competitor Grid */}
			<SectionLayout>
				<div className="space-y-6">
					{competitors.map((competitor, idx) => {
						const Icon = competitor.icon;

						return (
							<AnimateOnScroll
								key={competitor.key}
								variant="fade-up"
								delay={idx * 60}
							>
								<div className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:border-[hsl(var(--primary)/0.4)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.05)]">
									{/* Competitor Header */}
									<div className="mb-5 flex items-center gap-3">
										<div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))]">
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
												{t(`competitors.${competitor.key}.name`)}
											</h3>
											<p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
												{t(`competitors.${competitor.key}.category`)}
											</p>
										</div>
									</div>

									{/* Two Column: Gap vs Edge */}
									<div className="grid gap-4 md:grid-cols-2">
										{/* Their Gap */}
										<div className="rounded-lg border border-[hsl(var(--destructive)/0.2)] bg-[hsl(var(--destructive)/0.04)] p-4">
											<div className="mb-2 flex items-center gap-2">
												<AlertTriangle className="h-4 w-4 text-[hsl(var(--destructive))]" />
												<span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--destructive))]">
													{t("theirGap")}
												</span>
											</div>
											<p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
												{t(`competitors.${competitor.key}.keyWeakness`)}
											</p>
										</div>

										{/* SimUser Edge */}
										<div className="rounded-lg border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.04)] p-4">
											<div className="mb-2 flex items-center gap-2">
												<CheckCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
												<span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
													{t("ourEdge")}
												</span>
											</div>
											<p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
												{t(`competitors.${competitor.key}.simuserAdvantage`)}
											</p>
										</div>
									</div>
								</div>
							</AnimateOnScroll>
						);
					})}
				</div>
			</SectionLayout>

			<CTASection
				title={t("cta.title")}
				subtitle={t("cta.subtitle")}
				primaryCTA={{
					label: t("cta.primary"),
					onClick: () => setIsModalOpen(true),
				}}
			/>

			<ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
