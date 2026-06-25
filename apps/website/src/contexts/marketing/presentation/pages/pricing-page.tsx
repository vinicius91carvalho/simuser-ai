"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@simuser/ui";
import { Check, ChevronDown, Minus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { ContactCTASection } from "@/contexts/engagement/presentation/components/contact-cta-section";
import { ContactModal } from "@/contexts/engagement/presentation/components/contact-modal";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { FounderCTA } from "../components/founder-cta";
import { HeroSection } from "../components/hero-section";
import { SectionLayout } from "../components/section-layout";

const planKeys = ["starter", "growth", "scale", "enterprise"] as const;
const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

const comparisonRows = [
	{
		key: "personas",
		values: ["yes", "no", "no", "text-only", "prototypes", "no"],
	},
	{
		key: "liveTesting",
		values: ["yes", "yes", "yes", "no", "no", "human"],
	},
	{ key: "uxFeedback", values: ["yes", "no", "no", "yes", "yes", "human"] },
	{ key: "nps", values: ["yes", "no", "no", "no", "no", "partial"] },
	{ key: "video", values: ["yes", "yes", "yes", "no", "no", "yes"] },
	{
		key: "autoDiscovery",
		values: ["yes", "partial", "no", "no", "no", "no"],
	},
	{
		key: "selfHealing",
		values: ["yes", "yes", "partial", "no", "no", "no"],
	},
	{
		key: "creditPricing",
		values: ["yes", "no", "no", "no", "no", "no"],
	},
	{
		key: "startupPricing",
		values: ["yes", "yes", "no", "yes", "yes", "no"],
	},
	{
		key: "noHumans",
		values: ["yes", "yes", "partial", "yes", "yes", "no"],
	},
] as const;

const comparisonHeaders = [
	"simuser",
	"momentic",
	"qaWolf",
	"syntheticUsers",
	"uxia",
	"applause",
] as const;

function ComparisonCell({ value }: { value: string }) {
	if (value === "yes")
		return <Check className="h-4 w-4 text-[hsl(var(--accent))]" />;
	if (value === "no")
		return <X className="h-4 w-4 text-[hsl(var(--muted-foreground)/0.4)]" />;
	if (value === "partial")
		return <Minus className="h-4 w-4 text-[hsl(var(--secondary))]" />;
	return (
		<span className="text-xs text-[hsl(var(--muted-foreground))]">{value}</span>
	);
}

const costOptions = [50, 100, 200, 500];

export function PricingPageContent() {
	const t = useTranslations("marketing.pricing");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [testers, setTesters] = useState(10);
	const [costPerTester, setCostPerTester] = useState(100);
	const [hoursPerWeek, setHoursPerWeek] = useState(10);

	const annualSavings = testers * costPerTester * 12;
	const hoursSaved = hoursPerWeek * 52;
	const creditsEquivalent = Math.ceil(testers * 5);

	const handleTestersChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setTesters(Number(e.target.value));
		},
		[],
	);

	const handleCostChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setCostPerTester(Number(e.target.value));
		},
		[],
	);

	const handleHoursChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setHoursPerWeek(Number(e.target.value));
		},
		[],
	);

	return (
		<>
			{/* Hero */}
			<HeroSection
				badge={t("badge")}
				title={t("title")}
				subtitle={t("subtitle")}
			/>

			{/* Pricing Cards */}
			<SectionLayout>
				<div className="mb-6 text-center">
					<p className="text-sm text-[hsl(var(--muted-foreground))]">
						{t("whatIsCredit")}
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{planKeys.map((planKey, idx) => {
						const isPopular = planKey === "growth";
						return (
							<AnimateOnScroll
								key={planKey}
								variant="fade-up"
								delay={idx * 100}
							>
								<div
									className={cn(
										"relative flex h-full flex-col rounded-xl border bg-[hsl(var(--card))] p-6",
										isPopular
											? "border-[hsl(var(--primary))] shadow-lg shadow-[hsl(var(--primary)/0.1)]"
											: "border-[hsl(var(--border))]",
									)}
								>
									{isPopular && (
										<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--primary))] px-3 py-0.5 text-xs font-semibold text-[hsl(var(--primary-foreground))]">
											Most Popular
										</div>
									)}
									<div className="mb-4">
										<h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
											{t(`plans.${planKey}.name`)}
										</h3>
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											{t(`plans.${planKey}.target`)}
										</p>
									</div>
									<div className="mb-4">
										<span className="text-3xl font-bold text-[hsl(var(--foreground))]">
											{t(`plans.${planKey}.price`)}
										</span>
										<span className="text-sm text-[hsl(var(--muted-foreground))]">
											{t(`plans.${planKey}.period`)}
										</span>
									</div>
									<p className="mb-1 text-sm font-medium text-[hsl(var(--accent))]">
										{t(`plans.${planKey}.credits`)}
									</p>
									<p className="mb-4 text-xs text-[hsl(var(--muted-foreground))]">
										{t(`plans.${planKey}.overage`)}
									</p>
									<ul className="mb-6 flex-1 space-y-2">
										{(t.raw(`plans.${planKey}.features`) as string[]).map(
											(feature: string) => (
												<li
													key={feature}
													className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]"
												>
													<Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
													{feature}
												</li>
											),
										)}
									</ul>
									<button
										type="button"
										onClick={() => setIsModalOpen(true)}
										className={cn(
											"w-full rounded-lg py-2.5 text-sm font-semibold transition-all",
											isPopular
												? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
												: "border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
										)}
									>
										{t("cta.primary")}
									</button>
								</div>
							</AnimateOnScroll>
						);
					})}
				</div>

				{/* Credit Packs */}
				<AnimateOnScroll variant="fade-in" delay={400}>
					<div className="mt-10 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6 text-center">
						<h3 className="mb-2 text-lg font-semibold text-[hsl(var(--foreground))]">
							{t("creditPacks.heading")}
						</h3>
						<p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
							{t("creditPacks.subheading")}
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							{(["pack1", "pack2", "pack3"] as const).map((key) => (
								<span
									key={key}
									className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm text-[hsl(var(--foreground))]"
								>
									{t(`creditPacks.${key}`)}
								</span>
							))}
						</div>
					</div>
				</AnimateOnScroll>
			</SectionLayout>

			{/* ROI Calculator */}
			<SectionLayout variant="muted">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("roi.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("roi.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-3xl">
					<div className="grid gap-8 md:grid-cols-2">
						{/* Inputs */}
						<div className="space-y-6">
							<div>
								<label
									htmlFor="roi-testers"
									className="mb-2 flex justify-between text-sm font-medium text-[hsl(var(--foreground))]"
								>
									<span>{t("roi.testersLabel")}</span>
									<span className="text-[hsl(var(--primary))]">{testers}</span>
								</label>
								<input
									id="roi-testers"
									type="range"
									min="1"
									max="100"
									value={testers}
									onChange={handleTestersChange}
									className="w-full accent-[hsl(var(--primary))]"
								/>
							</div>

							<div>
								<label
									htmlFor="roi-cost"
									className="mb-2 block text-sm font-medium text-[hsl(var(--foreground))]"
								>
									{t("roi.costLabel")}
								</label>
								<select
									id="roi-cost"
									value={costPerTester}
									onChange={handleCostChange}
									className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))]"
								>
									{costOptions.map((cost) => (
										<option key={cost} value={cost}>
											${cost}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="roi-hours"
									className="mb-2 flex justify-between text-sm font-medium text-[hsl(var(--foreground))]"
								>
									<span>{t("roi.hoursLabel")}</span>
									<span className="text-[hsl(var(--primary))]">
										{hoursPerWeek}h
									</span>
								</label>
								<input
									id="roi-hours"
									type="range"
									min="1"
									max="40"
									value={hoursPerWeek}
									onChange={handleHoursChange}
									className="w-full accent-[hsl(var(--primary))]"
								/>
							</div>
						</div>

						{/* Results */}
						<div className="space-y-4">
							<AnimateOnScroll variant="fade-up">
								<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-center">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										{t("roi.resultSavings")}
									</p>
									<p className="text-3xl font-bold text-[hsl(var(--accent))]">
										${annualSavings.toLocaleString()}
										<span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">
											{t("roi.perYear")}
										</span>
									</p>
								</div>
							</AnimateOnScroll>
							<AnimateOnScroll variant="fade-up" delay={100}>
								<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-center">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										{t("roi.resultTime")}
									</p>
									<p className="text-3xl font-bold text-[hsl(var(--primary))]">
										{hoursSaved.toLocaleString()}{" "}
										<span className="text-sm font-normal text-[hsl(var(--muted-foreground))]">
											{t("roi.hours")}
										</span>
									</p>
								</div>
							</AnimateOnScroll>
							<AnimateOnScroll variant="fade-up" delay={200}>
								<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 text-center">
									<p className="text-sm text-[hsl(var(--muted-foreground))]">
										{t("roi.resultCredits")}
									</p>
									<p className="text-3xl font-bold text-[hsl(var(--secondary))]">
										{creditsEquivalent}
									</p>
								</div>
							</AnimateOnScroll>
						</div>
					</div>
				</div>
			</SectionLayout>

			{/* Competitive Comparison */}
			<SectionLayout>
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("comparison.heading")}
						</h2>
						<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
							{t("comparison.subheading")}
						</p>
					</div>
				</AnimateOnScroll>
				<AnimateOnScroll variant="fade-up">
					<div className="overflow-x-auto">
						<table className="w-full min-w-[700px] border-collapse">
							<thead>
								<tr>
									<th className="px-3 py-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">
										{t("comparison.headers.capability")}
									</th>
									{comparisonHeaders.map((h) => (
										<th
											key={h}
											className={cn(
												"px-3 py-3 text-center text-sm font-medium",
												h === "simuser"
													? "text-[hsl(var(--primary))]"
													: "text-[hsl(var(--muted-foreground))]",
											)}
										>
											{t(`comparison.headers.${h}`)}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{comparisonRows.map((row, rowIdx) => (
									<tr
										key={row.key}
										className={
											rowIdx % 2 === 0 ? "bg-[hsl(var(--muted)/0.3)]" : ""
										}
									>
										<td className="px-3 py-3 text-sm text-[hsl(var(--foreground))]">
											{t(`comparison.rows.${row.key}`)}
										</td>
										{row.values.map((val, colIdx) => (
											<td
												key={comparisonHeaders[colIdx]}
												className={cn(
													"px-3 py-3 text-center",
													colIdx === 0 ? "bg-[hsl(var(--primary)/0.05)]" : "",
												)}
											>
												<div className="flex items-center justify-center">
													<ComparisonCell value={val} />
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</AnimateOnScroll>
			</SectionLayout>

			{/* FAQ */}
			<SectionLayout variant="muted">
				<AnimateOnScroll variant="fade-in">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
							{t("faq.heading")}
						</h2>
					</div>
				</AnimateOnScroll>
				<div className="mx-auto max-w-2xl">
					<Accordion.Root type="single" collapsible>
						{faqKeys.map((qKey, idx) => (
							<AnimateOnScroll key={qKey} variant="fade-up" delay={idx * 60}>
								<Accordion.Item
									value={qKey}
									className="border-b border-[hsl(var(--border))]"
								>
									<Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]">
										{t(`faq.${qKey}`)}
										<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
									</Accordion.Trigger>
									<Accordion.Content className="overflow-hidden text-sm text-[hsl(var(--muted-foreground))] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
										<div className="pb-4">
											{t(`faq.${qKey.replace("q", "a") as `a${string}`}`)}
										</div>
									</Accordion.Content>
								</Accordion.Item>
							</AnimateOnScroll>
						))}
					</Accordion.Root>
				</div>
			</SectionLayout>

			{/* Founder CTA */}
			<FounderCTA
				heading={t("founderCta.heading")}
				message={t("founderCta.message")}
			/>

			{/* Final CTA */}
			<ContactCTASection />

			{/* Plan card modal */}
			<ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
