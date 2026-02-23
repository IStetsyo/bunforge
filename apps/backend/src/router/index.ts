import { RouterClient } from "@orpc/server";
import planetRouter from "./planet";

export const router = {
  planet: planetRouter,
};

export type AppRouter = typeof router;
export type AppRouterClient = RouterClient<AppRouter>;
