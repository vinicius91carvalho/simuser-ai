"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SectionLayout } from "@/contexts/marketing/presentation/components/section-layout";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { ContactModal } from "./contact-modal";

interface ContactCTASectionProps {
	variant?: "default" | "muted" | "dark";
}

export function ContactCTASection({
	variant = "dark",
}: ContactCTASectionProps) {
	const t = useTranslations("engagement.contact");
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<SectionLayout variant={variant} className="relative overflow-hidden">
				{/* Decorative gradient */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.05)] to-[hsl(var(--accent)/0.05)]" />

				<div className="relative mx-auto max-w-3xl text-center">
					<AnimateOnScroll variant="fade-up">
						<h2 className="mb-4 text-3xl font-bold text-[hsl(var(--foreground))] sm:text-4xl">
							{t("ctaTitle")}
						</h2>
					</AnimateOnScroll>

					<AnimateOnScroll variant="fade-up" delay={100}>
						<p className="mx-auto mb-8 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
							{t("ctaSubtitle")}
						</p>
					</AnimateOnScroll>

					<AnimateOnScroll variant="fade-up" delay={200}>
						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
							<a
								href="/get-started"
								className="animate-button-glow inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-8 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] shadow-lg transition-all hover:opacity-90"
							>
								{t("ctaPrimary")}
							</a>
							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-transparent px-8 py-3 text-base font-semibold text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))]"
							>
								{t("ctaSecondary")}
							</button>
						</div>
					</AnimateOnScroll>
				</div>
			</SectionLayout>

			<ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
