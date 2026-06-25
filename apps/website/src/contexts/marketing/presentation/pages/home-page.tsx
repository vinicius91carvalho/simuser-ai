"use client";

import {
	Code,
	Eye,
	Layout,
	Lock,
	MessageSquare,
	Monitor,
	Scan,
	Shield,
	UserCheck,
	Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactCTASection } from "@/contexts/engagement/presentation/components/contact-cta-section";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { ExperienceReportPreview } from "../components/experience-report-preview";
import { FAQSection } from "../components/faq-section";
import { FeatureShowcaseSection } from "../components/feature-showcase-section";
import { FounderCTA } from "../components/founder-cta";
import { HeroSection } from "../components/hero-section";
import { HeroVisualization } from "../components/hero-visualization";
import { MetricCard } from "../components/metric-card";
import { PersonaCard } from "../components/persona-card";
import { SectionLayout } from "../components/section-layout";
import { SecurityCommitmentCard } from "../components/security-commitment-card";
import { SelfHealingSection } from "../components/self-healing-section";
import { StepCard } from "../components/step-card";
import { UsageModeCard } from "../components/usage-mode-card";

const STEP_GRADIENT_COLORS = [
	"hsl(270, 95%, 65%)", // Step 1: violet
	"hsl(251, 94%, 62%)", // Step 2
	"hsl(232, 93%, 59%)", // Step 3
	"hsl(213, 92%, 56%)", // Step 4
	"hsl(194, 91%, 53%)", // Step 5
	"hsl(175, 90%, 50%)", // Step 6: cyan
];

const personaConfigs = [
	{ key: "newUser", icon: "U", accentColor: "hsl(270, 95%, 65%)" },
	{ key: "powerUser", icon: "P", accentColor: "hsl(175, 90%, 50%)" },
	{
		key: "securityEngineer",
		icon: "S",
		accentColor: "hsl(35, 95%, 55%)",
	},
	{
		key: "accessibilityTester",
		icon: "A",
		accentColor: "hsl(270, 95%, 65%)",
	},
	{
		key: "nonTechnicalManager",
		icon: "M",
		accentColor: "hsl(175, 90%, 50%)",
	},
	{ key: "mobileUser", icon: "R", accentColor: "hsl(35, 95%, 55%)" },
	{
		key: "internationalUser",
		icon: "I",
		accentColor: "hsl(270, 95%, 65%)",
	},
] as const;

export function HomePageContent() {
	const t = useTranslations("marketing.home");

	return (
		<>
			{/* 1. Hero Section */}
			<HeroSection
				badge={t("badge")}
				title={t("title")}
				subtitle={t("subtitle")}
				primaryCTA={{
					label: t("cta.primary"),
					href: "/get-started",
				}}
				secondaryCTA={{
					label: t("cta.secondary"),
					onClick: () => {
						document
							.getElementById("how-it-works")
							?.scrollIntoView({ behavior: "smooth" });
					},
				}}
			>
				<HeroVisualization />
			</HeroSection>

			{/* 2. Metrics Section */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-8 text-center">
						<h2 className="text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("metrics.heading")}
						</h2>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 md:grid-cols-3">
					<MetricCard
						value={t("metrics.stat1.value")}
						label={t("metrics.stat1.label")}
						source={t("metrics.stat1.source")}
						sourceUrl={t("metrics.stat1.sourceUrl")}
						delay={0}
					/>
					<MetricCard
						value={t("metrics.stat2.value")}
						label={t("metrics.stat2.label")}
						source={t("metrics.stat2.source")}
						sourceUrl={t("metrics.stat2.sourceUrl")}
						delay={100}
					/>
					<MetricCard
						value={t("metrics.stat3.value")}
						label={t("metrics.stat3.label")}
						source={t("metrics.stat3.source")}
						sourceUrl={t("metrics.stat3.sourceUrl")}
						delay={200}
					/>
				</div>
			</SectionLayout>

			{/* 4. Why Now Section */}
			<SectionLayout variant="muted">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-4 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("whyNow.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("whyNow.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{(["stat1", "stat2", "stat3", "stat4"] as const).map((key, idx) => (
						<AnimateOnScroll key={key} variant="fade-up" delay={idx * 100}>
							<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-center">
								<p className="mb-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-3xl font-bold text-transparent">
									{t(`whyNow.${key}.value`)}
								</p>
								<p className="mb-2 text-sm text-[hsl(var(--foreground))]">
									{t(`whyNow.${key}.label`)}
								</p>
								<a
									href={t(`whyNow.${key}.sourceUrl`)}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs text-[hsl(var(--muted-foreground))] underline-offset-2 transition-colors hover:text-[hsl(var(--primary))] hover:underline"
								>
									{t(`whyNow.${key}.source`)}
								</a>
							</div>
						</AnimateOnScroll>
					))}
				</div>
				<AnimateOnScroll variant="fade-in">
					<p className="text-center text-lg font-semibold text-[hsl(var(--secondary))]">
						{t("whyNow.conclusion")}
					</p>
				</AnimateOnScroll>
			</SectionLayout>

			{/* 5. How It Works Section */}
			<SectionLayout variant="muted" id="how-it-works">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("howItWorks.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("howItWorks.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-xl">
					{(
						["step1", "step2", "step3", "step4", "step5", "step6"] as const
					).map((key, idx) => (
						<StepCard
							key={key}
							number={idx + 1}
							title={t(`howItWorks.${key}.title`)}
							description={t(`howItWorks.${key}.description`)}
							delay={idx * 100}
							color={STEP_GRADIENT_COLORS[idx]}
						/>
					))}
				</div>
			</SectionLayout>

			{/* 7. Feature Showcase Section (NEW) */}
			<FeatureShowcaseSection />

			{/* 8. Self-Healing Section (NEW) */}
			<SelfHealingSection />

			{/* 9. Persona Showcase Section */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("personas.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("personas.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{personaConfigs.map((persona, idx) => (
						<PersonaCard
							key={persona.key}
							personaKey={persona.key}
							icon={persona.icon}
							accentColor={persona.accentColor}
							delay={idx * 80}
						/>
					))}
				</div>
			</SectionLayout>

			{/* 10. Experience Report Preview Section */}
			<SectionLayout variant="dark">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("experienceReport.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("experienceReport.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<ExperienceReportPreview />
			</SectionLayout>

			{/* 11. Usage Modes Section */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("usageModes.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("usageModes.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<UsageModeCard
						icon={<Layout className="h-6 w-6" />}
						title={t("usageModes.dashboard.title")}
						description={t("usageModes.dashboard.description")}
						delay={0}
					/>
					<UsageModeCard
						icon={<Code className="h-6 w-6" />}
						title={t("usageModes.api.title")}
						description={t("usageModes.api.description")}
						delay={100}
					/>
					<UsageModeCard
						icon={<Monitor className="h-6 w-6" />}
						title={t("usageModes.cicd.title")}
						description={t("usageModes.cicd.description")}
						disabled
						delay={200}
					/>
					<UsageModeCard
						icon={<MessageSquare className="h-6 w-6" />}
						title={t("usageModes.slack.title")}
						description={t("usageModes.slack.description")}
						disabled
						delay={300}
					/>
					<UsageModeCard
						icon={<Scan className="h-6 w-6" />}
						title={t("usageModes.issueTracking.title")}
						description={t("usageModes.issueTracking.description")}
						disabled
						delay={400}
					/>
					<UsageModeCard
						icon={<Users className="h-6 w-6" />}
						title={t("usageModes.customPersonas.title")}
						description={t("usageModes.customPersonas.description")}
						delay={500}
					/>
				</div>
			</SectionLayout>

			{/* 12. Security Summary Section */}
			<SectionLayout variant="dark">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("security.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("security.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<SecurityCommitmentCard
						icon={Eye}
						title={t("security.pii.title")}
						description={t("security.pii.description")}
						delay={0}
					/>
					<SecurityCommitmentCard
						icon={Lock}
						title={t("security.encryption.title")}
						description={t("security.encryption.description")}
						delay={100}
					/>
					<SecurityCommitmentCard
						icon={UserCheck}
						title={t("security.isolation.title")}
						description={t("security.isolation.description")}
						delay={200}
					/>
					<SecurityCommitmentCard
						icon={Monitor}
						title={t("security.retention.title")}
						description={t("security.retention.description")}
						delay={300}
					/>
					<SecurityCommitmentCard
						icon={Scan}
						title={t("security.soc2.title")}
						description={t("security.soc2.description")}
						delay={400}
					/>
					<SecurityCommitmentCard
						icon={Shield}
						title={t("security.gdpr.title")}
						description={t("security.gdpr.description")}
						delay={500}
					/>
				</div>
			</SectionLayout>

			{/* 13. FAQ Section (NEW) */}
			<FAQSection />

			{/* 14. Founder CTA */}
			<FounderCTA
				heading={t("founderCta.heading")}
				message={t("founderCta.message")}
			/>

			{/* 15. Contact CTA */}
			<ContactCTASection />
		</>
	);
}
