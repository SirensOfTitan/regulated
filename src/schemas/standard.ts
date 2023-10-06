import { z } from "zod";

export const standard = () =>
  z
    .object({
      ID: z.string(),
      Description: z.optional(z.string()),
      "Include in Filter": z.optional(z.boolean()),
      Name: z.string(),
      Products: z.optional(z.array(z.string())),
      Website: z.optional(z.string()),
    })
    .transform((obj) => ({
      id: obj["ID"],
      description: obj["Description"],
      includeInFilter: obj["Include in Filter"] ?? false,
      name: obj["Name"],
      products: obj["Products"] ?? [],
      website: obj["Website"],
    }));
