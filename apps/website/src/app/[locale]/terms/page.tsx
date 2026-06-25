import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TermsPageContent } from "@/contexts/legal/presentation/pages/terms-page";
import type { Locale } from "@/lib/i18n/config";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "legal.terms" });

	return {
		title: t("title"),
		description:
			locale === "pt-br"
				? "Termos e condicoes de uso da plataforma SimUser AI."
				: "Terms and conditions for using the SimUser AI platform.",
		openGraph: {
			title: t("title"),
			description:
				locale === "pt-br"
					? "Termos e condicoes de uso da plataforma SimUser AI."
					: "Terms and conditions for using the SimUser AI platform.",
			type: "website",
			siteName: "SimUser AI",
		},
	};
}

export default async function TermsPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return <TermsPageContent />;
}
