import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { StagingAuthPageContent } from "@/contexts/shell/presentation/pages/staging-auth-page";
import type { Locale } from "@/lib/i18n/config";

type Props = {
	params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
	title: "Staging Access",
	robots: { index: false, follow: false },
};

export default async function StagingAuthPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale as Locale);

	return <StagingAuthPageContent />;
}
