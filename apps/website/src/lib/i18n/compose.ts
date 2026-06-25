import type { Locale } from "./config";

type Messages = Record<string, unknown>;

/**
 * Composes translation messages from multiple bounded contexts
 * into a single merged message object for next-intl.
 *
 * Each context provides its own namespace to avoid key collisions.
 * Example: shell.nav.home, marketing.hero.title
 */
export async function composeMessages(locale: Locale): Promise<Messages> {
	const contexts = ["shell", "marketing", "engagement", "legal"] as const;
	const composed: Messages = {};

	for (const context of contexts) {
		try {
			const messages = await import(
				`@/contexts/${context}/infrastructure/i18n/${locale}.json`
			);
			composed[context] = messages.default;
		} catch {
			// Context may not have translations yet — skip silently during development
		}
	}

	return composed;
}
