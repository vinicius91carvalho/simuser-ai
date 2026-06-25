# SimUser AI Marketing Website

## Execution Config

- **build**: `pnpm turbo build`
- **test**: `pnpm turbo test`
- **lint**: `pnpm exec biome check .`
- **lint-fix**: `pnpm exec biome check --write .`
- **type-check**: `pnpm turbo check-types`
- **e2e**: `pnpm exec playwright test`
- **dev**: `pnpm turbo dev`
- **kill**: `lsof -ti:3000 | xargs kill -9 2>/dev/null || true`
- **session-learnings-path**: `docs/session-learnings.md`
- **task-file-location**: `docs/tasks/`
- **knowledge-files**: `docs/solutions/`
- **package-manager**: pnpm (npm/npx forbidden)

## Key Context Files

- `SimUser_AI_Business_Plan_v1_0.md` — Full business plan with personas, pricing, competitors, market data
- `site-structure-template.md` — Site architecture reference, component specs, animation system, tech stack
- `docs/tasks/website/feature/2026-03-13_1700-simuser-ai-marketing-website.md` — PRD with 8 sprints
