import { os } from "@orpc/server";
import z from "zod";
import { PlanetSchema } from "./schema";

const listPlanet = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    }),
  )
  .handler(async ({ input }) => {
    return [{ id: 1, name: "name" }];
  });

const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return { id: 1, name: "name" };
  });

const createPlanet = os
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    return { id: 1, name: "name" };
  });

export default {
  list: listPlanet,
  find: findPlanet,
  create: createPlanet,
};
