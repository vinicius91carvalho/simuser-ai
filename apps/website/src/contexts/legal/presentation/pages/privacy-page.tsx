"use client";

import { useTranslations } from "next-intl";
import { HeroSection } from "@/contexts/marketing/presentation/components/hero-section";
import { SectionLayout } from "@/contexts/marketing/presentation/components/section-layout";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";

const sectionKeys = [
	"dataCollection",
	"dataUse",
	"dataProtection",
	"dataRetention",
	"thirdParty",
	"yourRights",
	"cookies",
	"children",
	"changes",
	"contact",
] as const;

export function PrivacyPageContent() {
	const t = useTranslations("legal.privacy");

	return (
		<>
			<HeroSection title={t("title")} subtitle={t("lastUpdated")} />

			<SectionLayout>
				<div className="mx-auto max-w-3xl">
					<AnimateOnScroll variant="fade-in">
						<p className="mb-10 text-[hsl(var(--muted-foreground))] leading-relaxed">
							{t("intro")}
						</p>
					</AnimateOnScroll>

					<div className="space-y-8">
						{sectionKeys.map((key, idx) => (
							<AnimateOnScroll key={key} variant="fade-up" delay={idx * 50}>
								<div>
									<h2 className="mb-3 text-xl font-bold text-[hsl(var(--foreground))]">
										{t(`sections.${key}.title`)}
									</h2>
									<p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
										{t(`sections.${key}.content`)}
									</p>
								</div>
							</AnimateOnScroll>
						))}
					</div>
				</div>
			</SectionLayout>
		</>
	);
}
