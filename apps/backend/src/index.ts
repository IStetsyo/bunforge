import { RPCHandler } from "@orpc/server/fetch";
import { Elysia } from "elysia";
import { router } from "./router";
import { onError } from "@orpc/server";
import { CORSPlugin } from "@orpc/server/plugins";

const MAIN_API_PORT = process.env.MAIN_API_PORT || 8080;

const handler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin({
      origin: (origin, options) => origin,
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const app = new Elysia()
  .all(
    "/rpc*",
    async ({ request }: { request: Request }) => {
      const { response } = await handler.handle(request, {
        prefix: "/rpc",
      });

      return response ?? new Response("Not Found", { status: 404 });
    },
    {
      parse: "none", // Disable Elysia body parser to prevent "body already used" error
    },
  )
  .listen(MAIN_API_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
