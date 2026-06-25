// Root page is handled by the middleware + next-intl with localePrefix: "as-needed".
// The middleware detects locale from cookie/geo/Accept-Language and either
// rewrites to /en internally (for English) or redirects to /pt-br/ (for Portuguese).
// This file exists only as a fallback — the middleware handles all routing.

import { redirect } from "next/navigation";

export default function RootPage() {
	redirect("/en");
}
