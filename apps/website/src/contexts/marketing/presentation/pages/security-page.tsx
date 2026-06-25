"use client";

import {
	CheckCircle,
	Eye,
	Key,
	Layers,
	Lock,
	Network,
	Shield,
	ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactCTASection } from "@/contexts/engagement/presentation/components/contact-cta-section";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { FeatureCard } from "../components/feature-card";
import { FounderCTA } from "../components/founder-cta";
import { HeroSection } from "../components/hero-section";
import { SectionLayout } from "../components/section-layout";
import { SecurityCommitmentCard } from "../components/security-commitment-card";

const layerKeys = [
	"waf",
	"network",
	"encryption",
	"database",
	"audit",
] as const;
const layerIcons = [Shield, Network, Lock, Layers, Eye];

const commitmentKeys = [
	"noTraining",
	"noAccess",
	"iso",
	"privateLink",
	"guardrails",
] as const;
const commitmentIcons = [ShieldCheck, Lock, CheckCircle, Key, Eye];

const complianceKeys = ["gdpr", "soc2", "lgpd", "iso27001"] as const;
const dataProtectionKeys = [
	"pii",
	"credentials",
	"retention",
	"isolation",
] as const;

export function SecurityPageContent() {
	const t = useTranslations("marketing.security");

	return (
		<>
			<HeroSection
				badge={t("badge")}
				title={t("title")}
				subtitle={t("subtitle")}
			/>

			{/* Architecture Layers */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("layers.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("layers.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-2xl space-y-4">
					{layerKeys.map((key, idx) => {
						const Icon = layerIcons[idx];
						return (
							<AnimateOnScroll key={key} variant="fade-up" delay={idx * 100}>
								<div className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)]">
										<Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
									</div>
									<div>
										<h3 className="font-semibold text-[hsl(var(--foreground))]">
											{t(`layers.${key}.title`)}
										</h3>
										<p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
											{t(`layers.${key}.description`)}
										</p>
									</div>
								</div>
							</AnimateOnScroll>
						);
					})}
				</div>
			</SectionLayout>

			{/* AI/LLM Commitments */}
			<SectionLayout variant="dark">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("aiCommitments.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("aiCommitments.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{commitmentKeys.map((key, idx) => (
						<SecurityCommitmentCard
							key={key}
							icon={commitmentIcons[idx]}
							title={t(`aiCommitments.${key}.title`)}
							description={t(`aiCommitments.${key}.description`)}
							delay={idx * 80}
						/>
					))}
				</div>
			</SectionLayout>

			{/* Compliance */}
			<SectionLayout variant="muted">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("compliance.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("compliance.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2">
					{complianceKeys.map((key, idx) => (
						<AnimateOnScroll key={key} variant="fade-up" delay={idx * 100}>
							<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
								<div className="mb-2 flex items-center justify-between">
									<h3 className="font-semibold text-[hsl(var(--foreground))]">
										{t(`compliance.${key}.title`)}
									</h3>
									<span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2.5 py-0.5 text-xs text-[hsl(var(--muted-foreground))]">
										{t(`compliance.${key}.status`)}
									</span>
								</div>
								<p className="text-sm text-[hsl(var(--muted-foreground))]">
									{t(`compliance.${key}.description`)}
								</p>
							</div>
						</AnimateOnScroll>
					))}
				</div>
			</SectionLayout>

			{/* Data Protection */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("dataProtection.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("dataProtection.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="grid gap-6 sm:grid-cols-2">
					{dataProtectionKeys.map((key, idx) => (
						<FeatureCard
							key={key}
							icon={Shield}
							title={t(`dataProtection.${key}.title`)}
							description={t(`dataProtection.${key}.description`)}
							delay={idx * 100}
						/>
					))}
				</div>
			</SectionLayout>

			<FounderCTA
				heading={t("founderCta.heading")}
				message={t("founderCta.message")}
			/>

			<ContactCTASection />
		</>
	);
}
