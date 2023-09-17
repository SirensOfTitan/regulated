import { z } from "zod";

export const user = () =>
  z
    .object({
      Name: z.string(),
      Abbreviation: z.optional(z.string()),
      Products: z.optional(z.array(z.string())),
    })
    .transform((obj) => ({
      name: obj["Name"],
      abbreviation: obj["Abbreviation"] ?? "",
      products: obj["Products"] ?? [],
    }));
