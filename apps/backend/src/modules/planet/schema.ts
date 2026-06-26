import z from "zod";

export const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
});
