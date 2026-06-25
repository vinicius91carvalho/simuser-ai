import type { Metadata } from "next";
import type { Locale } from "./i18n/config";

const BASE_URL = "https://simuser.ai";
const LOCALES: Locale[] = ["en", "pt-br"];

/**
 * Generates canonical URL and hreflang alternate links for a page.
 *
 * @param locale - The current page locale
 * @param path - The page path without locale prefix, e.g. "/product" or "" for home
 * @returns Partial Metadata object with alternates.canonical and alternates.languages
 *
 * Example output for locale="en", path="/product":
 *   canonical: "https://simuser.ai/en/product/"
 *   languages: { en: "https://simuser.ai/en/product/", "pt-br": "https://simuser.ai/pt-br/product/", "x-default": "https://simuser.ai/en/product/" }
 */
export function getSeoAlternates(
	locale: Locale | string,
	path: string,
): Pick<Metadata, "alternates"> {
	// Ensure path ends with trailing slash for consistency with trailingSlash: true
	const normalizedPath = path.endsWith("/") ? path : `${path}/`;
	const canonical = `${BASE_URL}/${locale}${normalizedPath}`;

	const languages: Record<string, string> = {};
	for (const loc of LOCALES) {
		languages[loc] = `${BASE_URL}/${loc}${normalizedPath}`;
	}
	// x-default points to English as the primary language
	languages["x-default"] = `${BASE_URL}/en${normalizedPath}`;

	return {
		alternates: {
			canonical,
			languages,
		},
	};
}
