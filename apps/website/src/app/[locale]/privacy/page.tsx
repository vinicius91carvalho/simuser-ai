import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PrivacyPageContent } from "@/contexts/legal/presentation/pages/privacy-page";
import type { Locale } from "@/lib/i18n/config";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "legal.privacy" });

	return {
		title: t("title"),
		description:
			locale === "pt-br"
				? "Como a SimUser AI coleta, usa e protege seus dados. Conformidade com GDPR e LGPD."
				: "How SimUser AI collects, uses, and protects your data. GDPR and LGPD compliant.",
		openGraph: {
			title: t("title"),
			description:
				locale === "pt-br"
					? "Como a SimUser AI coleta, usa e protege seus dados."
					: "How SimUser AI collects, uses, and protects your data.",
			type: "website",
			siteName: "SimUser AI",
		},
	};
}

export default async function PrivacyPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return <PrivacyPageContent />;
}
