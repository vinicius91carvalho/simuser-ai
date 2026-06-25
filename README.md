<p align="center">
  <img src="apps/website/public/soap.svg" alt="A pink bar of soap" width="160">
  <br>
  <sub><i>"The first soap was made from the ashes of heroes." — Tyler Durden</i></sub>
</p>

<h1 align="center">SimUser AI — Marketing Website</h1>

<p align="center">
  <a href="https://vinicius91carvalho.github.io/simuser-ai/"><img alt="Live demo" src="https://img.shields.io/badge/demo-GitHub%20Pages-2EA44F"></a>
  <img alt="Status" src="https://img.shields.io/badge/status-proof%20of%20concept-8A2BE2">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs">
  <img alt="Static export" src="https://img.shields.io/badge/output-static%20export-2496ED">
</p>

<p align="center">
  <b>AI personas that explore your web app and report back what real users would feel — once a product, now a proof of concept.</b>
</p>

> *"This is only a proof of concept."* — the first and only rule of this demo.

## About

> *"You are not your job."* — and this repo is not the company. It's the website it left behind.

SimUser AI **was** an AI-powered beta-testing platform: spin up diverse synthetic personas, let them wander a web application, and collect qualitative UX feedback with NPS scores — thousands of beta testers, zero recruitment.

The product is no longer live. It **used to be hosted at [simuser.ai](https://simuser.ai)** (with a staging mirror at `staging.simuser.ai`), backed by AWS CloudFront via SST. **That hosting is gone.** What survives is this marketing site, rebuilt as a pure static export and rehosted on **GitHub Pages** at **[vinicius91carvalho.github.io/simuser-ai](https://vinicius91carvalho.github.io/simuser-ai/)** so the work isn't lost.

It's a showcase, not a service. Every form on the page is a façade — there's no backend, nothing is collected, and a modal will tell you so.

## What changed for the POC

> *"It's only after we've lost everything that we're free to do anything."* — including delete the server.

A static host runs no server code, so the server-dependent pieces were removed:

| Was (live site) | Now (POC on Pages) |
| --- | --- |
| `/api/notify` route → Loops.so signups, IP rate-limiting, secret key | **Removed.** Submitting any form opens a "this is only a POC" notice. |
| `middleware.ts` → geo / Accept-Language locale redirect | **Removed.** Both locales are pre-rendered; pick one from the UI. |
| Security response headers via Next.js / CloudFront | **Removed.** A static host can't set them; not needed for a demo. |
| AWS CloudFront + SST deploy | **GitHub Actions → GitHub Pages** (`.github/workflows/pages.yml`). |

A site-wide modal greets first-time visitors, and every waitlist/contact form swaps its "you're subscribed" success for a POC notice — nothing leaves your browser.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (`output: "export"`, static HTML) |
| Language | TypeScript 5.8, React 19 |
| Styling | Tailwind CSS 4 + Radix UI |
| i18n | next-intl (English, Portuguese-BR) |
| Monorepo | pnpm workspaces + Turborepo |
| Linting | Biome |
| Testing | Playwright (mobile, tablet, desktop, wide) |
| Hosting | GitHub Pages (was AWS CloudFront via SST) |
| CI/CD | GitHub Actions |

## Monorepo Structure

```
simuser-ai/
├── apps/website/          # Next.js marketing site (static export → out/)
├── packages/ui/           # Shared UI components + theme
├── packages/shared/       # Shared constants & types
├── tests/                 # E2E & screenshot tests
├── scripts/               # Build utilities
└── docs/                  # Tasks & session learnings
```

### Bounded Contexts (DDD)

Domain-driven contexts under `apps/website/src/contexts/`:

- **shell** — Header, footer, layout, animations, the POC notice modal
- **marketing** — Home, product, pricing, security, competitor pages
- **engagement** — Get started, contact modal, waitlist (now POC-only)
- **legal** — Privacy policy, terms of service

## Getting Started

> *"When in doubt, run the build."*

### Prerequisites

- Node.js 22+
- pnpm 10+ (`npm` and `npx` are **not** used in this project)

### Install & Run

```bash
pnpm install
pnpm dev          # dev server at http://localhost:3000
```

> **Note:** locally the dev server runs from the base path — open
> `http://localhost:3000/simuser-ai/` if a bare `/` looks empty.

### Common Commands

```bash
pnpm turbo build                 # static export → apps/website/out/
pnpm turbo check-types           # TypeScript type checking
pnpm exec biome check .          # lint & format check
pnpm exec biome check --write .  # auto-fix lint & format
pnpm exec playwright test        # E2E tests (4 viewports)
```

## Deployment

> *"Keep it secret, keep it static."*

Pushing to `master` triggers [`.github/workflows/pages.yml`](.github/workflows/pages.yml): it installs deps, runs `pnpm turbo build`, and publishes `apps/website/out/` to GitHub Pages.

**One-time setup:** in the repo, **Settings → Pages → Build and deployment → Source = GitHub Actions**.

The site is served from a sub-path, so `next.config.ts` sets `basePath: "/simuser-ai"`. If this ever moves to a custom domain or a `*.github.io` root repo, drop the `basePath`.

## Internationalization

Two locales, always locale-prefixed routes (`/en/`, `/pt-br/`) — required for the static export, since there's no middleware to rewrite unprefixed paths. The root `/` redirects into the default locale. Translation files live in each context's `infrastructure/i18n/` directory.

## License

Proprietary. All rights reserved.
