import { Elysia } from "elysia";

const MAIN_API_PORT = process.env.MAIN_API_PORT || 8080;
const app = new Elysia().get("/", () => "Hello Elysia").listen(MAIN_API_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
