import { getRequestConfig } from "next-intl/server";
import { composeMessages } from "./compose";
import { type Locale, locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = (await requestLocale) as Locale;

	if (!locale || !locales.includes(locale)) {
		locale = "en";
	}

	const messages = await composeMessages(locale);

	return {
		locale,
		messages,
	};
});
