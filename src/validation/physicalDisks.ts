import { z } from "zod";

export const physicalDiskQuerySchema = z
  .object({
    controllerId: z.string().uuid().optional(),
    enclosureId: z.string().uuid().optional(),
  })
  .refine((query) => !(query.controllerId && query.enclosureId), {
    message: "Provide either controllerId or enclosureId, not both",
  });
