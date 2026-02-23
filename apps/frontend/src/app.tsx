import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { getQueryClient } from "./lib/query";
import { QueryClientProvider } from "@tanstack/solid-query";

export default function App() {
  const queryClient = getQueryClient();
  return (
    <Router
      root={(props) => (
        <QueryClientProvider client={queryClient}>
          <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <a href="/">Index</a>
            <a href="/about">About</a>
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        </QueryClientProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
