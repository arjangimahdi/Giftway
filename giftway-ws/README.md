# Giftway

AI-powered gift recommender: a 5-step wizard turns "I have no idea what to get them" into a purchasable shortlist. Product spec and roadmap live in [`../documents/`](../documents/README.md).

## Workspace

Nx monorepo (npm workspaces).

| Project  | Path              | What it is                                                                           |
| -------- | ----------------- | ------------------------------------------------------------------------------------ |
| `web`    | `apps/web`        | React 19 + Vite + Tailwind v4 + React Router — the wizard, waiting room, and results |
| `api`    | `apps/api`        | Express 5 + Mongoose (MongoDB) — recommendation pipeline, click tracking             |
| `tokens` | `packages/tokens` | Design tokens (style-dictionary → Tailwind `@theme` CSS + TS constants)              |
| `ui`     | `packages/ui`     | Shared React components (tailwind-variants) with Storybook                           |

## Run

```sh
npm ci
cp .env.example .env
docker compose up mongo -d      # MongoDB only
npx nx serve api                # http://localhost:3333/health
npx nx serve web                # http://localhost:4200
```

Or the whole stack in Docker: `docker compose up --build`.

## Common tasks

```sh
npx nx run-many -t lint typecheck test build   # everything
npx nx affected -t lint typecheck test         # only what changed
npx nx storybook ui                            # component workbench
npx nx generate tokens                         # rebuild theme.css / tokens.ts after editing packages/tokens/tokens/*.json
npx nx graph                                   # project graph
```

## Conventions

See [`CLAUDE.md`](CLAUDE.md) and `.claude/rules/` — they are written for AI assistants but are the canonical conventions for humans too.
