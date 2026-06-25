import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/staging-auth/"],
		},
		sitemap: "https://simuser.ai/sitemap.xml",
		host: "https://simuser.ai",
	};
}
