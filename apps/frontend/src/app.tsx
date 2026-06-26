import { QueryClientProvider } from "@tanstack/solid-query";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";
import "./app.css";
import { getQueryClient } from "./lib/query";

export default function App() {
  const queryClient = getQueryClient();

  onMount(() => {
    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  });

  return (
    <Router
      root={(props) => (
        <QueryClientProvider client={queryClient}>
          <MetaProvider>
            <Title>Bunforge</Title>
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        </QueryClientProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
