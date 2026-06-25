"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { SectionLayout } from "./section-layout";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FAQSection() {
	const t = useTranslations("marketing.home");

	return (
		<SectionLayout>
			<AnimateOnScroll variant="fade-in">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
						{t("faq.heading")}
					</h2>
					<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
						{t("faq.subheading")}
					</p>
				</div>
			</AnimateOnScroll>

			<AnimateOnScroll variant="fade-up">
				<div className="mx-auto max-w-3xl">
					<Accordion.Root type="single" collapsible className="space-y-3">
						{faqKeys.map((key, idx) => (
							<AnimateOnScroll key={key} variant="fade-up" delay={idx * 50}>
								<Accordion.Item
									value={key}
									className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-colors data-[state=open]:border-[hsl(var(--primary)/0.3)]"
								>
									<Accordion.Header>
										<Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))] sm:text-base">
											<span>{t(`faq.${key}.question`)}</span>
											<ChevronDown className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform duration-200 group-data-[state=open]:rotate-180" />
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
										<div className="border-t border-[hsl(var(--border))] px-5 py-4">
											<p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
												{t(`faq.${key}.answer`)}
											</p>
										</div>
									</Accordion.Content>
								</Accordion.Item>
							</AnimateOnScroll>
						))}
					</Accordion.Root>
				</div>
			</AnimateOnScroll>
		</SectionLayout>
	);
}
