# SimUser AI — Marketing Website

AI-powered beta testing platform that creates diverse AI personas to explore web applications and deliver qualitative UX feedback with NPS scores.

**Live:** [simuser.ai](https://simuser.ai) | **Staging:** [staging.simuser.ai](https://staging.simuser.ai)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (static export) |
| Language | TypeScript 5.8, React 19 |
| Styling | Tailwind CSS 4 + Radix UI |
| i18n | next-intl (English, Portuguese-BR) |
| Monorepo | pnpm workspaces + Turborepo |
| Linting | Biome |
| Testing | Playwright (mobile, tablet, desktop, wide) |
| Infra | AWS CloudFront via SST |
| CI/CD | GitHub Actions |

## Monorepo Structure

```
simuser-ai/
├── apps/website/          # Next.js marketing site
├── packages/ui/           # Shared UI components + theme
├── packages/shared/       # Shared constants & types
├── tests/                 # E2E & screenshot tests
├── scripts/               # Build & deploy utilities
└── docs/                  # Tasks & session learnings
```

### Bounded Contexts (DDD)

The website is organized into domain-driven contexts under `apps/website/src/contexts/`:

- **shell** — Header, footer, layout, animations
- **marketing** — Home, product, pricing, security, competitor pages
- **engagement** — Get started, contact modal, waitlist
- **legal** — Privacy policy, terms of service

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+ (`npm` and `npx` are **not** used in this project)

### Install & Run

```bash
pnpm install
pnpm dev          # starts dev server at http://localhost:3000
```

### Common Commands

```bash
pnpm turbo build          # production build (static export to out/)
pnpm turbo check-types    # TypeScript type checking
pnpm exec biome check .   # lint & format check
pnpm exec biome check --write .  # auto-fix lint & format
pnpm exec playwright test # E2E tests (4 viewports)
```

## Deployment

Deployments are handled via SST on AWS:

- **Staging** deploys automatically on push to the `staging` branch
- **Production** deploys to `simuser.ai` with `www` redirect

```bash
pnpm exec sst deploy --stage staging
pnpm exec sst deploy --stage production
```

## Internationalization

Two locales are supported, with locale-prefixed routes (`/en/`, `/pt-br/`):

Translation files live in each context's `infrastructure/i18n/` directory.

## License

Proprietary. All rights reserved.
