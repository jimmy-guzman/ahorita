# ahorita

> Another task management application built for the sake of playing with new technologies.

## 🐣 Technologies

### Tooling

- [Bun](https://bun.sh)
- [Turborepo](https://turbo.build/repo)
- [Biome](https://biomejs.dev)
- [lefthook](https://github.com/evilmartians/lefthook)
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
- [Lucide](https://lucide.dev)
- [Vite](https://vitejs.dev)

### Backend

- [ElysiaJS](https://elysiajs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon](https://neon.tech)
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

And to create a [neon branch](https://neon.tech/docs/introduction/branching#development), run the following:

```
brew install neonctl
neonctl auth
neonctl branches create --name dev/[your name]
neonctl branches list
```

Then setup environment variables, by running the following:

```
cp .env.example .env
```

Then to push your schema changes directly to the database, by running the following:

```
bun db:push
```

Then you start running things, by running the following:

```
bun dev
```
