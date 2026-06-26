# bunforge

A minimal full-stack TypeScript starter built with **SolidStart**, **oRPC**, **Elysia**, **TanStack Query**, **Tailwind CSS v4**, **DaisyUI**, **Bun**, and **Turborepo**.

`bunforge` is designed for building type-safe apps without DTO duplication or schema drift. Backend procedures are defined once, shared types are generated automatically, and the frontend consumes them with end-to-end type safety.

---

## Why bunforge?

- **End-to-end typesafe** API calls with oRPC
- **No duplicated DTOs** between frontend and backend
- **Generated shared router types** from backend procedures
- **Monorepo-ready** with Turborepo workspaces
- **Fast local dev** with Bun
- **Modern UI stack** with SolidStart, Tailwind v4, and DaisyUI
- **Minimal architecture** that is easy to extend

---

## Stack

### Frontend

- [SolidStart](https://start.solidjs.com/)
- [SolidJS](https://www.solidjs.com/)
- [TanStack Query for Solid](https://tanstack.com/query/latest/docs/framework/solid/overview)
- [TanStack Form for Solid](https://tanstack.com/form)
- [oRPC Client](https://orpc.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend

- [Elysia](https://elysiajs.com/)
- [oRPC Server](https://orpc.dev/)
- [Zod](https://zod.dev/)
- [Bun](https://bun.sh/)

### Monorepo / Tooling

- [Turborepo](https://turbo.build/repo)
- shared TypeScript, ESLint, and Tailwind config packages
- generated shared router types in `packages/shared-types`

---

## Monorepo structure

```txt
bunforge/
├── apps/
│   ├── backend/     # Elysia + oRPC server
│   └── frontend/    # SolidStart app
├── packages/
│   ├── eslint-config/
│   ├── shared-types/
│   ├── tailwind-config/
│   └── typescript-config/
├── package.json
└── turbo.json
```

---

## How it works

### 1. Define procedures on the backend

Procedures live in the backend router and use Zod for validation.

```ts
const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return PlanetService.findPlanet(input.id);
  });
```

### 2. Generate shared router types

The backend exports router types into `packages/shared-types/router`.

```json
"generate-types": "tsup src/router/index.ts --format esm --dts-only --out-dir ../../packages/shared-types/router"
```

### 3. Consume them on the frontend

The frontend creates an oRPC client from the generated shared router types.

```ts
import type { AppRouterClient } from "@repo/shared-types/router";

export const orpc = createORPCClient<AppRouterClient>(
  new RPCLink({
    url: `${getBaseUrl()}/rpc`,
  }),
);
```

This gives you typed procedure inputs and outputs in the UI without manually duplicating contracts.

---

## Features in this repo

Current demo includes:

- paginated planet listing
- find planet by id
- create planet with validation
- delete planet with confirmation
- frontend theme toggle with DaisyUI themes
- generated shared router typings from backend to frontend

---

## Getting started

### Requirements

- [Bun](https://bun.sh/) `>= 1.3.8`

### Install dependencies

```sh
bun install
```

### Start everything in development

```sh
bun run dev
```

This runs the Turborepo dev pipeline for all apps.

---

## Available scripts

### Root

```sh
bun run dev
bun run build
bun run lint
bun run format
bun run check-types
bun run generate-types
```

### Backend

```sh
bun run --filter backend dev
bun run --filter backend build
bun run --filter backend generate-types
```

### Frontend

```sh
bun run --filter frontend dev
bun run --filter frontend build
bun run --filter frontend start
```

---

## Development workflow

### Backend

Backend lives in `apps/backend`.

- Elysia serves the RPC endpoint at `/rpc`
- oRPC defines procedures
- Zod validates inputs
- router types are generated from the backend router

### Frontend

Frontend lives in `apps/frontend`.

- SolidStart handles routing and SSR
- TanStack Query manages async state
- oRPC client consumes generated backend types
- Tailwind + DaisyUI power styling and theming

### Shared types

Shared router types live in:

```txt
packages/shared-types/router
```

They are generated from the backend router during backend build/dev workflows.

---

## Theme system

The frontend uses DaisyUI themes defined in:

```txt
apps/frontend/src/app.css
```

Current themes:

- `lightforge`
- `darkforge`

Theme state is applied through `data-theme` on the document root.

---

## Build

To build the whole monorepo:

```sh
bun run build
```

This includes generating shared router types before the backend build.

---

## Using bunforge as a template

You have a few good options.

### Option 1: Use GitHub Template Repository

Best if you want a clean new repo with no git history.

1. Push `bunforge` to GitHub
2. Open the repository settings
3. Enable **Template repository**
4. Click **Use this template** when creating a new project

This creates a fresh repository based on `bunforge`.

### Option 2: Copy with `degit`

Best if you want a quick local copy without git history.

```sh
npx degit IStetsyo/bunforge my-app
cd my-app
bun install
```

If your repo name or owner is different, replace `IStetsyo/bunforge`.

### Option 3: Clone and detach history

Best if the repo is not marked as a template but you still want to reuse it.

```sh
git clone https://github.com/IStetsyo/bunforge.git my-app
cd my-app
rm -rf .git
git init
bun install
```

That gives you the codebase as a clean starting point.

### Option 4: Keep it as an internal starter

If this is mainly for your own projects, keep `bunforge` as a base repo and create new apps from it with either:

- GitHub template repo
- `degit`
- clone + remove `.git`

---

## Recommended template workflow

If you want this repo to be reusable long-term, I’d recommend:

1. keep `main` clean
2. remove project-specific branding when possible
3. document required environment variables
4. keep the example app small but representative
5. mark the GitHub repo as a **template repository**

That gives you the smoothest “copy this stack and start building” experience.

---

## Future ideas

Good next additions for a stronger starter:

- environment variable example files
- auth scaffold
- database integration
- test setup
- CI pipeline
- deployment docs
- reusable UI package

---

## Philosophy

- one language across the stack
- no schema drift
- minimal abstraction
- strong types where they matter
- fast feedback loops in development
