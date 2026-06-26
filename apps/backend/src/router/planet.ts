import { os } from "@orpc/server";
import z from "zod";
import PlanetService, { PlanetSchema } from "@/modules/planet";

const listPlanet = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).default(10),
      offset: z.number().int().min(0).default(0),
    }),
  )
  .handler(async ({ input }) => {
    return PlanetService.listPlanet(input);
  });

const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return PlanetService.findPlanet(input.id);
  });

const createPlanet = os
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input }) => {
    return PlanetService.createPlanet(input);
  });

const deletePlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return PlanetService.deletePlanet(input.id);
  });

export default {
  list: listPlanet,
  find: findPlanet,
  create: createPlanet,
  delete: deletePlanet,
};
