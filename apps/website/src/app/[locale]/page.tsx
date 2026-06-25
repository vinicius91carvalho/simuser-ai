import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePageContent } from "@/contexts/marketing/presentation/pages/home-page";
import { type Locale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "marketing.home" });

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

export default async function HomePage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return <HomePageContent />;
}
