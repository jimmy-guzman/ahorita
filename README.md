# ahorita

> Another task management application built for the sake of playing with new technologies.

## 🐣 Technologies

### Tooling

- [Bun](https://bun.sh)
- [Turborepo](https://turbo.build/repo)
- [Biome](https://biomejs.dev)
- [lefthook](https://github.com/evilmartians/lefthook)
- [Knip](https://knip.dev)
- [Playwright](https://playwright.dev)
- [GitHub Actions](https://github.com/features/actions)

### Frontend

- [React](https://react.dev)
- [TanStack Router](https://tanstack.com/router/v1)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Table](https://tanstack.com/table/latest)
- [React Hook Form](https://www.react-hook-form.com)
- [Valibot](https://valibot.dev)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Sonner](https://sonner.emilkowal.ski)
- [TailwindCSS](https://tailwindcss.com)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [daisyUI](https://daisyui.com)
- [Recharts](https://recharts.org)
- [Lucide](https://lucide.dev)
- [Vite](https://vitejs.dev)

### Backend

- [ElysiaJS](https://elysiajs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Turso](https://docs.turso.tech)
- [Lucia](https://lucia-auth.com)

## 🏁 Getting Started

This project uses [bun](https://bun.sh) so please [install](https://bun.sh/docs/installation) it to get started. You can do so, by running the following:

```
curl -fsSL https://bun.sh/install | bash
```

or if you have already have it installed you can update, by running the following:

```
bun upgrade
```

Then you can finally install dependencies, by running the following:

```
bun install
```

And to download new browsers for Playwright, run the following command:

```
bunx playwright install
```

[Turso](https://docs.turso.tech/introduction) is being used as the SQLite Database, which requires the [CLI to be installed](https://docs.turso.tech/cli/introduction):

```
brew install tursodatabase/tap/turso
```

Then you can either login or signup:

```
turso auth login
```

```
turso auth signup
```

Then you can start creating databases, for example:

```
turso db create ahorita
```

```
turso db create ahorita-dev --from-db ahorita
```

You can generate a `TURSO_AUTH_TOKEN`, by running the following:

```
turso db tokens create ahorita-dev
```

You can get the `DATABASE_URL`, by running the following:

```
turso db show ahorita-dev --url
```

Then setup environment variables, by running the following:

```
cp .env.example .env
```

Then to push your schema changes directly to the database, by running the following:

```
bun --filter @ahorita/backend db:push
```

Then you start running things, by running the following:

```
bun dev
```
