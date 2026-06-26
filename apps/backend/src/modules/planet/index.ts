import { ORPCError } from "@orpc/server";
import { PLANET_LIST } from "./constants";
import { Planet } from "./types";
import { PlanetSchema } from "./schema";

export class PlanetService {
  listPlanet(input: { limit: number; offset: number }) {
    const { limit, offset } = input;

    const start = offset;
    const end = offset + limit;

    const items = PLANET_LIST.sort((a, b) => a.id - b.id).slice(start, end);

    const nextCursor =
      end < PLANET_LIST.length ? (PLANET_LIST[end - 1]?.id ?? null) : null;
    const prevCursor = start > 0 ? (PLANET_LIST[start - 1]?.id ?? null) : null;

    return {
      data: items,
      nextCursor,
      prevCursor,
      total: PLANET_LIST.length,
    };
  }

  findPlanet(id: number) {
    const foundPlanet = PLANET_LIST.find((planet) => planet.id === id);

    if (!foundPlanet) {
      throw new ORPCError("NOT_FOUND");
    }

    return foundPlanet;
  }
  createPlanet(input: Omit<Planet, "id">) {
    const newId = PLANET_LIST.length ? PLANET_LIST.at(-1)!.id + 1 : 1;

    const newPlanet: Planet = {
      ...input,
      id: newId,
    };

    PLANET_LIST.push(newPlanet);

    return newPlanet;
  }
  deletePlanet(id: number) {
    const index = PLANET_LIST.findIndex((planet) => planet.id === id);

    if (index === -1) {
      throw new ORPCError("NOT_FOUND");
    }

    const [removed] = PLANET_LIST.splice(index, 1);

    return removed;
  }
}

export default new PlanetService();
export { PlanetSchema, type Planet };
