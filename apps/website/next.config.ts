import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

// Static export for GitHub Pages.
// The site is served from https://vinicius91carvalho.github.io/simuser-ai/, so
// every asset/link needs the /simuser-ai base path. trailingSlash makes each
// route emit a dir/index.html that Pages serves without rewrites.
// This is a POC mirror of the original simuser.ai site — a static host runs no
// middleware, API routes, or response headers, so those server features are gone.
const nextConfig: NextConfig = {
	output: "export",
	basePath: "/simuser-ai",
	trailingSlash: true,
	images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
