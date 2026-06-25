"use client";

import {
	ArrowRight,
	Camera,
	CheckCircle,
	Cog,
	FileText,
	GitBranch,
	Pencil,
	Radio,
	Search,
	UserPlus,
	Video,
	Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ContactCTASection } from "@/contexts/engagement/presentation/components/contact-cta-section";
import { ContactModal } from "@/contexts/engagement/presentation/components/contact-modal";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { FeatureCard } from "../components/feature-card";
import { FounderCTA } from "../components/founder-cta";
import { HeroSection } from "../components/hero-section";
import { SectionLayout } from "../components/section-layout";
import { StepCard } from "../components/step-card";

export function ProductPageContent() {
	const t = useTranslations("marketing.product");
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			{/* Hero */}
			<HeroSection
				badge={t("badge")}
				title={t("title")}
				subtitle={t("subtitle")}
				primaryCTA={{
					label: t("cta.primary"),
					onClick: () => setIsModalOpen(true),
				}}
				secondaryCTA={{
					label: t("cta.secondary"),
					href: "/pricing",
				}}
			/>

			{/* Connect Your Repository */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("repoIntegration.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("repoIntegration.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-xl">
					{(["step1", "step2", "step3", "step4"] as const).map((key, idx) => (
						<StepCard
							key={key}
							number={idx + 1}
							title={t(`repoIntegration.${key}`)}
							description=""
							delay={idx * 100}
						/>
					))}
				</div>
				<AnimateOnScroll variant="fade-in" delay={500}>
					<p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
						{t("repoIntegration.caption")}
					</p>
				</AnimateOnScroll>
			</SectionLayout>

			{/* Auto Flow Discovery (alternative) */}
			<SectionLayout variant="muted">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("discovery.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("discovery.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-xl">
					{(["step1", "step2", "step3", "step4"] as const).map((key, idx) => (
						<StepCard
							key={key}
							number={idx + 1}
							title={t(`discovery.${key}`)}
							description=""
							delay={idx * 100}
						/>
					))}
				</div>
				<AnimateOnScroll variant="fade-in" delay={500}>
					<p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
						{t("discovery.caption")}
					</p>
				</AnimateOnScroll>
			</SectionLayout>

			{/* Dashboard & Flow Management */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("dashboard.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("dashboard.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2">
					<FeatureCard
						icon={GitBranch}
						title={t("dashboard.flowDiagrams")}
						description={t("dashboard.flowDiagramsDesc")}
						delay={0}
					/>
					<FeatureCard
						icon={Pencil}
						title={t("dashboard.manualFlows")}
						description={t("dashboard.manualFlowsDesc")}
						delay={100}
					/>
					<FeatureCard
						icon={UserPlus}
						title={t("dashboard.manualPersonas")}
						description={t("dashboard.manualPersonasDesc")}
						delay={200}
					/>
					<FeatureCard
						icon={Radio}
						title={t("dashboard.liveStatus")}
						description={t("dashboard.liveStatusDesc")}
						delay={300}
					/>
				</div>
			</SectionLayout>

			{/* AI Persona Engine */}
			<SectionLayout variant="dark">
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
				<div className="grid gap-6 md:grid-cols-3">
					<AnimateOnScroll variant="fade-up" delay={0}>
						<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)]">
								<Search className="h-6 w-6 text-[hsl(var(--primary))]" />
							</div>
							<p className="text-sm text-[hsl(var(--foreground))]">
								{t("personas.selectLabel")}
							</p>
						</div>
					</AnimateOnScroll>
					<AnimateOnScroll variant="fade-up" delay={100}>
						<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.1)]">
								<ArrowRight className="h-6 w-6 text-[hsl(var(--accent))]" />
							</div>
							<p className="text-sm text-[hsl(var(--foreground))]">
								{t("personas.deployLabel")}
							</p>
						</div>
					</AnimateOnScroll>
					<AnimateOnScroll variant="fade-up" delay={200}>
						<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--secondary)/0.1)]">
								<Cog className="h-6 w-6 text-[hsl(var(--secondary))]" />
							</div>
							<p className="text-sm text-[hsl(var(--foreground))]">
								{t("personas.customLabel")}
							</p>
						</div>
					</AnimateOnScroll>
				</div>
			</SectionLayout>

			{/* Execution Engine */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("execution.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("execution.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2">
					<FeatureCard
						icon={Wrench}
						title={t("execution.tools")}
						description={t("execution.toolsDesc")}
						delay={0}
					/>
					<FeatureCard
						icon={Camera}
						title={t("execution.screenshots")}
						description={t("execution.screenshotsDesc")}
						delay={100}
					/>
					<FeatureCard
						icon={Video}
						title={t("execution.video")}
						description={t("execution.videoDesc")}
						delay={200}
					/>
					<FeatureCard
						icon={FileText}
						title={t("execution.actions")}
						description={t("execution.actionsDesc")}
						delay={300}
					/>
				</div>
			</SectionLayout>

			{/* Report Engine */}
			<SectionLayout variant="dark">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("reports.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("reports.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{(
						[
							"nps",
							"feedback",
							"bugs",
							"confusion",
							"grade",
							"consolidated",
						] as const
					).map((key, idx) => (
						<FeatureCard
							key={key}
							icon={CheckCircle}
							title={t(`reports.${key}`)}
							description={t(`reports.${key}Desc`)}
							delay={idx * 80}
						/>
					))}
				</div>
			</SectionLayout>

			{/* Self-Healing Architecture */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("selfHealing.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("selfHealing.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-xl">
					{(["step1", "step2", "step3", "step4"] as const).map((key, idx) => (
						<StepCard
							key={key}
							number={idx + 1}
							title={t(`selfHealing.${key}`)}
							description={t(`selfHealing.${key}Desc`)}
							delay={idx * 100}
						/>
					))}
				</div>
				<AnimateOnScroll variant="fade-up" delay={400}>
					<div className="mt-10 flex justify-center gap-8">
						<div className="text-center">
							<p className="text-3xl font-bold text-[hsl(var(--accent))]">
								{t("selfHealing.stat1")}
							</p>
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								{t("selfHealing.stat1Label")}
							</p>
						</div>
						<div className="text-center">
							<p className="text-3xl font-bold text-[hsl(var(--primary))]">
								{t("selfHealing.stat2")}
							</p>
							<p className="text-sm text-[hsl(var(--muted-foreground))]">
								{t("selfHealing.stat2Label")}
							</p>
						</div>
					</div>
					<a
						href={t("selfHealing.sourceUrl")}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-2 block text-center text-xs text-[hsl(var(--muted-foreground))] underline-offset-2 transition-colors hover:text-[hsl(var(--primary))] hover:underline"
					>
						Source: {t("selfHealing.source")}
					</a>
				</AnimateOnScroll>
			</SectionLayout>

			{/* Founder CTA */}
			<FounderCTA
				heading={t("founderCta.heading")}
				message={t("founderCta.message")}
			/>

			{/* Final CTA */}
			<ContactCTASection />

			{/* Hero modal (opened by hero CTA button) */}
			<ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
