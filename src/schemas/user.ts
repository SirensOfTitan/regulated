import { z } from "zod";

export const user = () =>
  z
    .object({
      ID: z.string(),
      Name: z.string(),
      Abbreviation: z.optional(z.string()),
      Products: z.optional(z.array(z.string())),
      Type: z.optional(z.string()),
      Slug: z.string(),
      Website: z.string().url(),
    })
    .transform((obj) => ({
      id: obj["ID"],
      name: obj["Name"],
      abbreviation: obj["Abbreviation"] ?? "",
      products: obj["Products"] ?? [],
      type: obj["Type"],
      slug: obj["Slug"],
      website: obj["Website"],
    }));
