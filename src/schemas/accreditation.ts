import { z } from "zod";

export const accreditation = () =>
  z
    .object({
      ID: z.string(),
      Type: z.string(),
      Products: z.optional(z.array(z.string())),
    })
    .transform((obj) => ({
      id: obj["ID"],
      type: obj["Type"],
      products: obj["Products"] ?? [],
    }));
