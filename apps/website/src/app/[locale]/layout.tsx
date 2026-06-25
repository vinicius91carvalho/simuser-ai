import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/contexts/shell/presentation/components/page-layout";
import { type Locale, locales } from "@/lib/i18n/config";
import "../globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://simuser.ai"),
	title: {
		default: "SimUser AI — AI-Powered Beta Testing with Synthetic Personas",
		template: "%s | SimUser AI",
	},
	description:
		"Create realistic AI personas that explore your web application, discover usability issues, and deliver experience reports with NPS scores.",
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
		apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
	},
	openGraph: {
		siteName: "SimUser AI",
		type: "website",
		images: [
			{
				url: "/logo-linkedin.svg",
				width: 400,
				height: 400,
				alt: "SimUser AI",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "SimUser AI",
	url: "https://simuser.ai",
	logo: "https://simuser.ai/logo.svg",
	description:
		"AI-powered beta testing platform that creates diverse AI personas to explore web applications and deliver qualitative UX feedback with NPS scores.",
	foundingDate: "2026",
	address: {
		"@type": "PostalAddress",
		addressRegion: "Delaware",
		addressCountry: "US",
	},
	sameAs: [],
};

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "SimUser AI",
	url: "https://simuser.ai",
	description:
		"AI-powered beta testing with synthetic personas. Thousands of beta testers. Zero recruitment. Real bugs found.",
	publisher: {
		"@type": "Organization",
		name: "SimUser AI",
	},
};

// Static JSON-LD content is safe to use with dangerouslySetInnerHTML
// as it contains no user-controlled input
const orgJsonLdString = JSON.stringify(organizationJsonLd);
const siteJsonLdString = JSON.stringify(websiteJsonLd);

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Enable static rendering for this locale
	setRequestLocale(locale as Locale);

	const messages = await getMessages();

	return (
		<html lang={locale} className="dark" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					// biome-ignore lint: static JSON-LD content, no XSS risk
					dangerouslySetInnerHTML={{
						__html: orgJsonLdString,
					}}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint: static JSON-LD content, no XSS risk
					dangerouslySetInnerHTML={{
						__html: siteJsonLdString,
					}}
				/>
			</head>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<PageLayout locale={locale as Locale}>{children}</PageLayout>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
