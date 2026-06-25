import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingPageContent } from "@/contexts/marketing/presentation/pages/pricing-page";
import type { Locale } from "@/lib/i18n/config";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "marketing.pricing" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			title: t("title"),
			description: t("subtitle"),
			type: "website",
			siteName: "SimUser AI",
		},
		twitter: {
			card: "summary_large_image",
			title: t("title"),
			description: t("subtitle"),
		},
	};
}

export default async function PricingPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	const t = await getTranslations({ locale, namespace: "marketing.pricing" });

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: t("faq.q1"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a1") },
			},
			{
				"@type": "Question",
				name: t("faq.q2"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a2") },
			},
			{
				"@type": "Question",
				name: t("faq.q3"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a3") },
			},
			{
				"@type": "Question",
				name: t("faq.q4"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a4") },
			},
			{
				"@type": "Question",
				name: t("faq.q5"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a5") },
			},
			{
				"@type": "Question",
				name: t("faq.q6"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a6") },
			},
			{
				"@type": "Question",
				name: t("faq.q7"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a7") },
			},
			{
				"@type": "Question",
				name: t("faq.q8"),
				acceptedAnswer: { "@type": "Answer", text: t("faq.a8") },
			},
		],
	};

	// JSON-LD FAQ structured data from translation keys (no user input, safe to serialize)
	const faqScript = JSON.stringify(faqJsonLd);

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from translation strings
				dangerouslySetInnerHTML={{ __html: faqScript }}
			/>
			<PricingPageContent />
		</>
	);
}
