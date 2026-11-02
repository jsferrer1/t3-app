# T3 App

A full-stack, typesafe web app built on the [T3 Stack](https://create.t3.gg/) (bootstrapped with `create-t3-app@7.23.1`):

- [Next.js](https://nextjs.org) (Pages Router)
- [tRPC](https://trpc.io) for the typesafe API
- [Prisma](https://prisma.io) with SQLite for local development
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Tailwind CSS](https://tailwindcss.com) and Font Awesome for UI
- [Storybook](https://storybook.js.org) for component development

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env      # then fill in the values, see below
npm run db:push           # create the local SQLite database
npm run dev               # http://localhost:3000
```

### Environment variables

Defined in `.env.example` and validated in `src/env.mjs`:

| Variable          | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`    | Prisma connection string. Defaults to `file:./db.sqlite` locally. |
| `NEXTAUTH_SECRET` | Required in production. Generate with `openssl rand -base64 32`.  |
| `NEXTAUTH_URL`    | Public base URL, e.g. `http://localhost:3000`.                    |

Set `SKIP_ENV_VALIDATION=1` to skip validation (useful for Docker/CI builds).

## Scripts

| Command                             | What it does                                |
| ----------------------------------- | ------------------------------------------- |
| `npm run dev`                       | Start the dev server                        |
| `npm run build` / `npm start`       | Production build / serve                    |
| `npm run lint` / `npm run lint:fix` | ESLint                                      |
| `npm run typecheck`                 | `tsc --noEmit`                              |
| `npm run format` / `format:check`   | Prettier write / check                      |
| `npm run storybook`                 | Storybook on http://localhost:6006          |
| `npm run build-storybook`           | Static Storybook build                      |
| `npm run db:push` / `db:studio`     | Sync the Prisma schema / open Prisma Studio |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, format check, build and Storybook build on every PR.

## Project layout

```
src/pages/            Next.js pages and API routes (auth, tRPC)
src/components/       React components (with *.stories.tsx next to them)
src/server/api/       tRPC routers (add new ones to root.ts)
src/server/auth.ts    NextAuth configuration
src/server/db.ts      Prisma client
prisma/schema.prisma  Database schema
```

## Deployment

The default SQLite database is for local development only; it does not persist on serverless hosts such as Vercel. Switch the Prisma datasource to a hosted database (Postgres, MySQL, ...) before deploying. See the create-t3-app guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker).
