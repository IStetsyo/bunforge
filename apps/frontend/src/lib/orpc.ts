import { isServer, getRequestEvent } from "solid-js/web";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

import type { AppRouterClient } from "@repo/shared-types/router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 8080}`;
};

export const orpc = createORPCClient<AppRouterClient>(
  new RPCLink({
    url: `${getBaseUrl()}/rpc`,
    headers: () => {
      // Forward cookies during Server-Side Rendering
      if (isServer) {
        const event = getRequestEvent();
        return {
          cookie: event?.request.headers.get("cookie") ?? "",
        };
      }
      return {};
    },
  }),
);

export const orpcQuery = createTanstackQueryUtils(orpc);
