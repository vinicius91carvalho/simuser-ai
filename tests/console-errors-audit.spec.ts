import { test, expect } from "@playwright/test";

/**
 * Console Error Audit — visits every page in both locales,
 * collects ALL console errors, warnings, and page errors.
 * Reports everything without filtering.
 */

const EN_ROUTES = [
	{ name: "home", path: "/simuser-ai/en/" },
	{ name: "product", path: "/simuser-ai/en/product/" },
	{ name: "pricing", path: "/simuser-ai/en/pricing/" },
	{ name: "security", path: "/simuser-ai/en/security/" },
	{ name: "get-started", path: "/simuser-ai/en/get-started/" },
	{ name: "compare", path: "/simuser-ai/en/compare/" },
	{ name: "privacy", path: "/simuser-ai/en/privacy/" },
	{ name: "terms", path: "/simuser-ai/en/terms/" },
];

const PT_BR_ROUTES = [
	{ name: "home", path: "/simuser-ai/pt-br/" },
	{ name: "product", path: "/simuser-ai/pt-br/product/" },
	{ name: "pricing", path: "/simuser-ai/pt-br/pricing/" },
	{ name: "security", path: "/simuser-ai/pt-br/security/" },
	{ name: "get-started", path: "/simuser-ai/pt-br/get-started/" },
	{ name: "compare", path: "/simuser-ai/pt-br/compare/" },
	{ name: "privacy", path: "/simuser-ai/pt-br/privacy/" },
	{ name: "terms", path: "/simuser-ai/pt-br/terms/" },
];

const ALL_ROUTES = [
	...EN_ROUTES.map((r) => ({ ...r, locale: "en" })),
	...PT_BR_ROUTES.map((r) => ({ ...r, locale: "pt-br" })),
];

for (const route of ALL_ROUTES) {
	test(`[${route.locale}] ${route.name} — console audit`, async ({ page }) => {
		const errors: string[] = [];
		const warnings: string[] = [];

		page.on("console", (msg) => {
			const text = msg.text();
			if (msg.type() === "error") {
				errors.push(text);
			} else if (msg.type() === "warning") {
				warnings.push(text);
			}
		});

		page.on("pageerror", (error) => {
			errors.push(`[UNCAUGHT] ${error.message}`);
		});

		const response = await page.goto(route.path, {
			waitUntil: "networkidle",
			timeout: 30_000,
		});

		const status = response?.status() ?? 0;

		// Wait for hydration and async effects
		await page.waitForTimeout(2000);

		// Scroll to bottom to trigger lazy-loaded content
		await page.evaluate(async () => {
			const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
			const totalHeight = document.body.scrollHeight;
			let scrolled = 0;
			while (scrolled < totalHeight) {
				scrolled += 400;
				window.scrollTo(0, scrolled);
				await delay(100);
			}
			// Scroll back to top
			window.scrollTo(0, 0);
		});

		// Wait for any scroll-triggered content
		await page.waitForTimeout(1000);

		// Report everything
		if (errors.length > 0) {
			console.log(`\n❌ ERRORS on ${route.locale}${route.path} (status: ${status}):`);
			for (const err of errors) {
				console.log(`   ${err}`);
			}
		}
		if (warnings.length > 0) {
			console.log(`\n⚠️ WARNINGS on ${route.locale}${route.path}:`);
			for (const warn of warnings) {
				console.log(`   ${warn}`);
			}
		}
		if (errors.length === 0 && warnings.length === 0) {
			console.log(`✅ ${route.locale}${route.path} — clean (status: ${status})`);
		}

		// Check HTTP status
		expect(status, `${route.path} returned HTTP ${status}`).toBeLessThan(400);
	});
}
