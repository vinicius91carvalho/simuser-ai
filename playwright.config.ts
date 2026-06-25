import { defineConfig } from "@playwright/test";

/**
 * Playwright configuration for SimUser AI marketing website.
 *
 * Uses a custom static file server (tests/serve-static.mjs) to host the
 * Next.js SSG output from apps/website/out/. This avoids the dev server
 * and third-party serve packages that call uv_interface_addresses, which
 * fails in PRoot environments.
 *
 * Start the server before running tests:
 *   node tests/serve-static.mjs &
 *   pnpm exec playwright test
 */
export default defineConfig({
	testDir: "./tests",
	outputDir: "./tests/test-results",
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: [["html", { open: "never" }], ["list"]],
	timeout: 60_000,
	expect: {
		timeout: 10_000,
	},
	use: {
		baseURL: process.env.BASE_URL || "http://127.0.0.1:9753",
		trace: "on-first-retry",
		screenshot: "off",
	},
	projects: [
		{
			name: "mobile",
			use: {
				viewport: { width: 375, height: 812 },
			},
		},
		{
			name: "tablet",
			use: {
				viewport: { width: 768, height: 1024 },
			},
		},
		{
			name: "desktop",
			use: {
				viewport: { width: 1280, height: 800 },
			},
		},
		{
			name: "wide",
			use: {
				viewport: { width: 1920, height: 1080 },
			},
		},
	],
});
