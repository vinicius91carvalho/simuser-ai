import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SecurityPageContent } from "@/contexts/marketing/presentation/pages/security-page";
import type { Locale } from "@/lib/i18n/config";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "marketing.security" });

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

export default async function SecurityPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return <SecurityPageContent />;
}
