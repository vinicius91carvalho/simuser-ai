import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

// Security headers applied in development and in Next.js server mode.
// For the static export deployed via SST/CloudFront, these same headers
// must be configured in sst.config.ts as CloudFront response headers policy.
const securityHeaders = [
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-Frame-Options",
		value: "SAMEORIGIN",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
];

const nextConfig: NextConfig = {
	// Security headers for development and server mode.
	// In production (SST Nextjs + CloudFront), these are also applied via the Next.js server.
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

export default withNextIntl(nextConfig);
