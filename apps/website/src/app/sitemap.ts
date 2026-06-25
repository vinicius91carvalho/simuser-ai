import type { MetadataRoute } from "next";

const BASE_URL = "https://simuser.ai";
const LOCALES = ["en", "pt-br"] as const;
const DEFAULT_LOCALE = "en";

// All pages available in both locales
const PAGES = [
	{ path: "", changeFrequency: "weekly" as const, priority: 1.0 },
	{ path: "/product", changeFrequency: "monthly" as const, priority: 0.9 },
	{ path: "/pricing", changeFrequency: "monthly" as const, priority: 0.9 },
	{ path: "/security", changeFrequency: "monthly" as const, priority: 0.8 },
	{
		path: "/get-started",
		changeFrequency: "monthly" as const,
		priority: 0.9,
	},
	// Competitor comparison page
	{ path: "/compare", changeFrequency: "monthly" as const, priority: 0.8 },
	// Legal pages (lower priority)
	{ path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
	{ path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
];

/**
 * Build the locale-prefixed URL. With localePrefix: "as-needed",
 * the default locale (en) has no prefix, non-default locales do.
 */
function localeUrl(locale: string, path: string): string {
	const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
	return `${BASE_URL}${prefix}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
	const entries: MetadataRoute.Sitemap = [];

	for (const page of PAGES) {
		for (const locale of LOCALES) {
			const url = localeUrl(locale, page.path);

			// Build alternates for hreflang
			const alternates: { languages: Record<string, string> } = {
				languages: {},
			};
			for (const alt of LOCALES) {
				alternates.languages[alt] = localeUrl(alt, page.path);
			}
			// Add x-default pointing to the English version (no prefix)
			alternates.languages["x-default"] = localeUrl(DEFAULT_LOCALE, page.path);

			entries.push({
				url,
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				alternates,
			});
		}
	}

	return entries;
}
