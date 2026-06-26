import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";
import { Logo } from "~/components/Logo";

const REPO_URL = "https://github.com/IStetsyo/bunforge";
const LIGHT_THEME = "lightforge";
const DARK_THEME = "darkforge";

const STACK = {
  frontend: [
    {
      title: "SolidStart",
      description:
        "Meta-framework for SolidJS, providing full-featured tools with optimized performance for building modern web applications.",
      url: "https://start.solidjs.com",
    },
    {
      title: "oRPC Client",
      description:
        "Type-safe RPC client that ensures type safety when making remote procedure calls (RPCs) to the server.",
      url: "https://orpc.dev/docs/client/client-side",
    },
    {
      title: "TanStack Query",
      description:
        "Async state management library for data fetching, caching, synchronization, and more in a declarative way.",
      url: "https://tanstack.com/query/v5/docs/framework/solid/overview",
    },
    {
      title: "Bun",
      description:
        "Fast JavaScript runtime optimized for performance, offering high-speed execution and enhanced tooling for web applications.",
      url: "https://bun.sh",
    },
  ],
  backend: [
    {
      title: "Elysia",
      description:
        "Fast web framework built with Bun, optimized for creating web applications and APIs.",
      url: "https://elysiajs.dev",
    },
    {
      title: "oRPC Server",
      description:
        "Type-safe procedure definitions for creating remote procedure calls (RPC) on the server side.",
      url: "https://orpc.dev/docs/client/server-side",
    },
    {
      title: "Bun",
      description:
        "JavaScript runtime and package manager, providing a fast, modern alternative to Node.js for both runtime and managing dependencies.",
      url: "https://bun.sh",
    },
  ],
};

const PHILOSOPHY = [
  "No DTO duplication",
  "Custom type generation script",
  "No schema drift",
  "One language across the stack",
];

const LOGIC = [
  "Define procedures on the backend with oRPC.",
  "Custom script syncs types to a shared folder on backend updates.",
  "Frontend consumes shared types with full type safety.",
];

const BACKEND_CODE = `import { os } from "@orpc/server";
  import z from "zod";
  import PlanetService, { PlanetSchema } from "@/modules/planet";
  const findPlanet = os
    .input(PlanetSchema.pick({ id: true }))
    .handler(async ({ input }) => {
      return PlanetService.findPlanet(input.id);
    });`;

const FRONTEND_CODE = `// Frontend: SolidJS with typed query
  import { createQuery } from "@tanstack/solid-query";
  import { client } from "./orpc-client";
  import { For } from "solid-js";

  function PlanetList() {
    const planets = createQuery(() => ({
      queryKey: ["planets"],
      queryFn: () => client.listPlanet({ cursor: undefined }),
    }));

    // planets.data is fully typed ✓
    return (
      <For each={planets.data?.planets}>
        {(planet) => <div>{planet.name}</div>}
      </For>
    )};`;

const formatNumber = (number: number) => {
  return number.toString().padStart(2, "0");
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  document.documentElement.setAttribute("data-theme", nextTheme);
  window.localStorage.setItem("theme", nextTheme);
};

export default function Home() {
  const navigate = useNavigate();

  const handleOpenExample = () => {
    navigate("/example");
  };

  return (
    <main class="min-h-screen h-full bg-base max-w-4xl mx-auto px-8">
      <Title>Bunforge - Explore</Title>
      <div class="py-20 flex items-center justify-between gap-8">
        <div class="space-y-6">
          <code class="text-sm uppercase text-info">bunforge / v1.0</code>
          <h1 class="text-5xl mt-4">bunforge</h1>
          <div class="space-y-1">
            <p class="text-lg font-semibold text-base-300">
              SolidStart · TanStack Query · oRPC · Elysia · Bun
            </p>
            <p class="font-medium text-base-200">
              End-to-end typesafe. Custom type generation. Minimal overhead.
            </p>
          </div>
          <div class="flex flex-wrap gap-4">
            <button class="btn btn-info text-sm" onClick={handleOpenExample}>
              View Example
            </button>
            <a href={REPO_URL} target="_blank">
              <button class="btn btn-base text-sm">View Source</button>
            </a>
          </div>
        </div>
        <button
          type="button"
          class="cursor-pointer rounded-xl transition-transform hover:scale-[1.02]"
          onDblClick={toggleTheme}
          aria-label="Toggle theme"
          title="Double click to toggle theme"
        >
          <Logo />
        </button>
      </div>
      <div class="divider divider-base" />
      <div class="py-16 space-y-12">
        <h1 class="text-2xl font-bold">The Stack</h1>
        <div class="flex flex-wrap gap-16 justify-between">
          <div class="flex-1 space-y-6">
            <p class="text-xs text-base-300 font-medium">FRONTEND</p>
            <div class="flex flex-col gap-y-6">
              <For each={STACK.frontend}>
                {(stackItem) => (
                  <span>
                    <a
                      class="text-lg font-medium hover:underline underline-offset-2"
                      href={stackItem.url}
                      target="_blank"
                    >
                      {stackItem.title}
                    </a>
                    <p class="text-sm text-base-300">{stackItem.description}</p>
                  </span>
                )}
              </For>
            </div>
          </div>
          <div class="flex-1 space-y-6">
            <p class="text-xs text-base-300 font-medium">BACKEND</p>
            <div class="flex flex-col gap-y-6">
              <For each={STACK.backend}>
                {(stackItem) => (
                  <span>
                    <a
                      class="text-lg font-medium hover:underline underline-offset-2"
                      href={stackItem.url}
                      target="_blank"
                    >
                      {stackItem.title}
                    </a>
                    <p class="text-sm text-base-300">{stackItem.description}</p>
                  </span>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
      <div class="divider divider-base" />
      <div class="py-16 space-y-12">
        <h1 class="text-2xl font-bold">How It Works</h1>
        <div class="flex flex-wrap gap-12">
          <For each={LOGIC}>
            {(logicItem, index) => (
              <div class="flex-1">
                <pre class="text-4xl text-base-200">
                  {formatNumber(index() + 1)}
                </pre>
                <p class="text-sm mt-2 text-base-300">{logicItem}</p>
              </div>
            )}
          </For>
        </div>
        <div class="flex flex-col gap-6">
          <div class="space-y-4">
            <p class="text-xs text-base-300 font-medium">BACKEND</p>
            <div class="mockup-code w-full bg-gray-200 dark:bg-base-200">
              <pre class="text-left text-base-content">{BACKEND_CODE}</pre>
            </div>
          </div>
          <div class="space-y-4">
            <p class="text-xs text-base-300 font-medium">FRONTEND</p>
            <div class="mockup-code w-full bg-gray-200 dark:bg-base-200">
              <pre class="text-left text-base-content">{FRONTEND_CODE}</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="divider divider-base" />
      <div class="py-16 space-y-12">
        <h1 class="text-2xl font-bold">Philosophy</h1>
        <ul class="flex flex-col gap-y-3 list-disc marker:text-info px-2">
          <For each={PHILOSOPHY}>
            {(philosophyItem) => (
              <li>
                <p class="text-sm text-base-300">{philosophyItem}</p>
              </li>
            )}
          </For>
        </ul>
      </div>
    </main>
  );
}
