import z from "zod";
import { PlanetSchema } from "./schema";

export type Planet = z.infer<typeof PlanetSchema>;
