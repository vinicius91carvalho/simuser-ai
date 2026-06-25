export const SITE_NAME = "SimUser AI";
export const SITE_URL = "https://simuser.ai";
export const DEFAULT_LOCALE = "en" as const;
export const LOCALES = ["en", "pt-br"] as const;
export type Locale = (typeof LOCALES)[number];
