"use client";

import { cn } from "@simuser/ui";
import { Calendar, Gift, Rocket, Star, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { HeroSection } from "@/contexts/marketing/presentation/components/hero-section";
import { SectionLayout } from "@/contexts/marketing/presentation/components/section-layout";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { useConfetti } from "../hooks/use-confetti";
import { useNotifyForm } from "../hooks/use-notify-form";

const benefitIcons = [Rocket, Gift, Users, Star, Zap, Calendar];

const teamSizeKeys = [
	"solo",
	"small",
	"medium",
	"large",
	"enterprise",
] as const;

export function GetStartedPageContent() {
	const t = useTranslations("engagement.getStarted");
	const tContact = useTranslations("engagement.contact");
	const { fireConfetti } = useConfetti();

	const { formData, status, errorMessage, errors, setField, handleSubmit } =
		useNotifyForm({ onSuccess: fireConfetti });

	return (
		<>
			<HeroSection
				badge={t("badge")}
				title={t("title")}
				subtitle={t("subtitle")}
			/>

			<SectionLayout>
				<div className="grid gap-12 lg:grid-cols-2">
					{/* Left: Form */}
					<AnimateOnScroll variant="fade-up">
						<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:p-8">
							{status === "success" || status === "already" ? (
								<div className="py-12 text-center">
									<div className="mb-4 text-5xl">&#127881;</div>
									<h2 className="mb-2 text-2xl font-bold text-[hsl(var(--foreground))]">
										{status === "already"
											? tContact("already.title")
											: t("form.successTitle")}
									</h2>
									<p className="text-[hsl(var(--muted-foreground))]">
										{status === "already"
											? tContact("already.message")
											: t("form.successDescription")}
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-5" noValidate>
									{/* Honeypot */}
									<input
										type="text"
										name="_gotcha"
										value={formData._gotcha}
										onChange={(e) => setField("_gotcha", e.target.value)}
										tabIndex={-1}
										aria-hidden="true"
										className="absolute h-0 w-0 overflow-hidden opacity-0"
										autoComplete="off"
									/>

									{/* First Name (mapped from "name" field) */}
									<div>
										<label
											htmlFor="gs-firstName"
											className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
										>
											{t("form.nameLabel")}
										</label>
										<input
											id="gs-firstName"
											type="text"
											placeholder={t("form.namePlaceholder")}
											value={formData.firstName}
											onChange={(e) => setField("firstName", e.target.value)}
											disabled={status === "loading"}
											aria-required="true"
											aria-invalid={!!errors.firstName}
											className={cn(
												"w-full rounded-lg border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]",
												errors.firstName
													? "border-[hsl(var(--destructive))]"
													: "border-[hsl(var(--border))]",
											)}
										/>
										{errors.firstName && (
											<p className="mt-1 text-xs text-[hsl(var(--destructive))]">
												{tContact(`validation.${errors.firstName}`)}
											</p>
										)}
									</div>

									{/* Email */}
									<div>
										<label
											htmlFor="gs-email"
											className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
										>
											{t("form.emailLabel")}
										</label>
										<input
											id="gs-email"
											type="email"
											placeholder={t("form.emailPlaceholder")}
											value={formData.email}
											onChange={(e) => setField("email", e.target.value)}
											disabled={status === "loading"}
											aria-required="true"
											aria-invalid={!!errors.email}
											className={cn(
												"w-full rounded-lg border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]",
												errors.email
													? "border-[hsl(var(--destructive))]"
													: "border-[hsl(var(--border))]",
											)}
										/>
										{errors.email && (
											<p className="mt-1 text-xs text-[hsl(var(--destructive))]">
												{tContact(`validation.${errors.email}`)}
											</p>
										)}
									</div>

									{/* Company (mapped from companyName) */}
									<div>
										<label
											htmlFor="gs-companyName"
											className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
										>
											{t("form.companyLabel")}
										</label>
										<input
											id="gs-companyName"
											type="text"
											placeholder={t("form.companyPlaceholder")}
											value={formData.companyName}
											onChange={(e) => setField("companyName", e.target.value)}
											disabled={status === "loading"}
											aria-required="true"
											aria-invalid={!!errors.companyName}
											className={cn(
												"w-full rounded-lg border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]",
												errors.companyName
													? "border-[hsl(var(--destructive))]"
													: "border-[hsl(var(--border))]",
											)}
										/>
										{errors.companyName && (
											<p className="mt-1 text-xs text-[hsl(var(--destructive))]">
												{tContact(`validation.${errors.companyName}`)}
											</p>
										)}
									</div>

									{/* Team Size (local field — informational, not sent to Loops) */}
									<div>
										<label
											htmlFor="gs-team-size"
											className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
										>
											{t("form.teamSizeLabel")}
										</label>
										<select
											id="gs-team-size"
											defaultValue=""
											disabled={status === "loading"}
											className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]"
										>
											<option value="">--</option>
											{teamSizeKeys.map((key) => (
												<option key={key} value={key}>
													{t(`form.teamSizeOptions.${key}`)}
												</option>
											))}
										</select>
									</div>

									{status === "error" && errorMessage && (
										<p className="text-sm text-[hsl(var(--destructive))]">
											{errorMessage}
										</p>
									)}

									<button
										type="submit"
										disabled={status === "loading"}
										className="animate-button-glow w-full rounded-lg bg-[hsl(var(--primary))] py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90 disabled:opacity-50"
									>
										{status === "loading"
											? t("form.submitting")
											: t("form.submitButton")}
									</button>

									<p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
										{t("form.noSpam")}
									</p>
								</form>
							)}
						</div>
					</AnimateOnScroll>

					{/* Right: Benefits */}
					<div className="space-y-8">
						{/* Benefits Checklist */}
						<AnimateOnScroll variant="fade-up" delay={100}>
							<div>
								<h3 className="mb-6 text-xl font-bold text-[hsl(var(--foreground))]">
									{t("benefits.heading")}
								</h3>
								<ul className="space-y-4">
									{[0, 1, 2, 3, 4, 5].map((i) => {
										const Icon = benefitIcons[i];
										return (
											<li
												key={`benefit-${i}`}
												className="flex items-start gap-3"
											>
												<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.1)]">
													<Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
												</div>
												<span className="text-sm text-[hsl(var(--foreground))]">
													{t(`benefits.items.${i}`)}
												</span>
											</li>
										);
									})}
								</ul>
							</div>
						</AnimateOnScroll>

						{/* Founder Note */}
						<AnimateOnScroll variant="fade-up" delay={200}>
							<div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
								<h4 className="mb-2 font-semibold text-[hsl(var(--foreground))]">
									{t("founderNote.heading")}
								</h4>
								<p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
									{t("founderNote.message")}
								</p>
								<a
									href="https://cal.com/simuserai/15min"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
								>
									<Calendar className="mr-2 h-4 w-4" />
									Book a call
								</a>
							</div>
						</AnimateOnScroll>
					</div>
				</div>
			</SectionLayout>
		</>
	);
}
