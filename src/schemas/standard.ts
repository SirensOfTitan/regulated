import { z } from "zod";

export const standard = () =>
  z
    .object({
      ID: z.string(),
      Description: z.optional(z.string()),
      Name: z.string(),
      Products: z.optional(z.array(z.string())),
      Website: z.optional(z.string()),
    })
    .transform((obj) => ({
      id: obj["ID"],
      description: obj["Description"],
      name: obj["Name"],
      products: obj["Products"] ?? [],
      website: obj["Website"],
    }));
