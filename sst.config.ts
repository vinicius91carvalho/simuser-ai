/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "simuser-ai-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage ?? ""),
      home: "aws",
    };
  },
  async run() {
    const { config } = await import("dotenv");
    config({ path: "apps/website/.env.local" });

    const isProduction = $app.stage === "production";

    // Domain configuration:
    // - Production: simuser.ai with www redirect (requires Route53 hosted zone + GoDaddy NS delegation)
    // - Staging/other: {stage}.simuser.ai (requires Route53 hosted zone)
    // - If DNS is not configured, omit domain to use CloudFront CDN URL directly
    const useDomain = process.env.SST_DOMAIN !== "false";

    const website = new sst.aws.Nextjs("Website", {
      path: "apps/website",
      ...(useDomain
        ? {
            domain: isProduction
              ? {
                  name: "simuser.ai",
                  redirects: ["www.simuser.ai"],
                  dns: sst.aws.dns({ override: true }),
                }
              : {
                  name: `${$app.stage}.simuser.ai`,
                  dns: sst.aws.dns({ override: true }),
                },
          }
        : {}),
      environment: {
        LOOPS_API_KEY: process.env.LOOPS_API_KEY ?? "",
      },
    });

    return {
      url: website.url,
    };
  },
});
