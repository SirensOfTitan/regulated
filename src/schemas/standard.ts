import { z } from "zod";

export const standard = () =>
  z
    .object({
      ID: z.string(),
      Name: z.string(),
      Products: z.optional(z.array(z.string())),
    })
    .transform((obj) => ({
      id: obj["ID"],
      name: obj["Name"],
      products: obj["Products"] ?? [],
    }));
