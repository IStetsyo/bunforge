import { QueryClient } from "@tanstack/solid-query";
import { isServer } from "solid-js/web";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Essential for SSR: Set a staleTime > 0.
        // If staleTime is 0, the client will immediately refetch the data
        // the moment it hydrates, completely defeating the purpose of SSR.
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: ALWAYS return a fresh instance to prevent cross-request data leaks
    return makeQueryClient();
  } else {
    // Browser: Return the singleton instance
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
