import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
	locales,
	defaultLocale,
	// "always" (not "as-needed") is required for the static export: without
	// middleware to rewrite unprefixed paths, the default-locale pages only
	// exist under /en, so links must carry the /en prefix too. Root "/" gets a
	// generated redirect into the default locale.
	localePrefix: "always",
	localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
