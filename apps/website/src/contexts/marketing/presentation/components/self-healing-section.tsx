"use client";

import {
	AlertTriangle,
	ArrowRight,
	CheckCircle2,
	Clock,
	RefreshCw,
	Search,
	Settings,
	ShieldCheck,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { SectionLayout } from "./section-layout";

function BeforeFlow({ t }: { t: (key: string) => string }) {
	const steps = [
		{ key: "codeChanges", icon: Settings },
		{ key: "testBreaks", icon: XCircle },
		{ key: "manualFix", icon: Clock },
		{ key: "hoursWasted", icon: AlertTriangle },
	];

	return (
		<div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
			<div className="mb-4 flex items-center gap-2">
				<XCircle className="h-5 w-5 text-red-400" />
				<h4 className="text-sm font-bold uppercase tracking-wider text-red-400">
					{t("selfHealing.before.label")}
				</h4>
			</div>
			<div className="space-y-3">
				{steps.map((step, idx) => {
					const Icon = step.icon;
					return (
						<div key={step.key}>
							<div className="flex items-center gap-3 rounded-lg bg-red-500/10 px-3 py-2.5">
								<Icon className="h-4 w-4 shrink-0 text-red-400" />
								<span className="text-sm text-red-300">
									{t(`selfHealing.before.${step.key}`)}
								</span>
							</div>
							{idx < steps.length - 1 && (
								<div className="flex justify-center py-1">
									<ArrowRight className="h-3 w-3 rotate-90 text-red-400/40" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function AfterFlow({ t }: { t: (key: string) => string }) {
	const steps = [
		{ key: "codeChanges", icon: Settings },
		{ key: "detectsChange", icon: Search },
		{ key: "adaptsFlow", icon: RefreshCw },
		{ key: "testsPass", icon: CheckCircle2 },
	];

	return (
		<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
			<div className="mb-4 flex items-center gap-2">
				<CheckCircle2 className="h-5 w-5 text-emerald-400" />
				<h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
					{t("selfHealing.after.label")}
				</h4>
			</div>
			<div className="space-y-3">
				{steps.map((step, idx) => {
					const Icon = step.icon;
					return (
						<div key={step.key}>
							<div className="flex items-center gap-3 rounded-lg bg-emerald-500/10 px-3 py-2.5">
								<Icon className="h-4 w-4 shrink-0 text-emerald-400" />
								<span className="text-sm text-emerald-300">
									{t(`selfHealing.after.${step.key}`)}
								</span>
							</div>
							{idx < steps.length - 1 && (
								<div className="flex justify-center py-1">
									<ArrowRight className="h-3 w-3 rotate-90 text-emerald-400/40" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function SelfHealingSection() {
	const t = useTranslations("marketing.home");

	return (
		<SectionLayout variant="muted">
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

			{/* Before/After comparison */}
			<div className="mb-12 grid gap-6 lg:grid-cols-2">
				<AnimateOnScroll variant="fade-right" delay={0}>
					<BeforeFlow t={t} />
				</AnimateOnScroll>
				<AnimateOnScroll variant="fade-left" delay={200}>
					<AfterFlow t={t} />
				</AnimateOnScroll>
			</div>

			{/* Concrete example */}
			<AnimateOnScroll variant="fade-up" delay={300}>
				<div className="mb-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
					<div className="mb-4 flex items-center gap-3">
						<ShieldCheck className="h-6 w-6 text-[hsl(var(--primary))]" />
						<h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
							{t("selfHealing.example.heading")}
						</h3>
					</div>
					<p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
						{t("selfHealing.example.description")}
					</p>
				</div>
			</AnimateOnScroll>

			{/* Statistics */}
			<div className="grid gap-4 sm:grid-cols-2">
				<AnimateOnScroll variant="fade-up" delay={400}>
					<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
						<p className="mb-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-3xl font-bold text-transparent">
							{t("selfHealing.stat1.value")}
						</p>
						<p className="text-sm text-[hsl(var(--muted-foreground))]">
							{t("selfHealing.stat1.label")}
						</p>
					</div>
				</AnimateOnScroll>
				<AnimateOnScroll variant="fade-up" delay={500}>
					<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center">
						<p className="mb-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-3xl font-bold text-transparent">
							{t("selfHealing.stat2.value")}
						</p>
						<p className="text-sm text-[hsl(var(--muted-foreground))]">
							{t("selfHealing.stat2.label")}
						</p>
					</div>
				</AnimateOnScroll>
			</div>
		</SectionLayout>
	);
}
