import { z } from "zod";

export const link = () =>
  z
    .object({
      ID: z.string(),
      URL: z.string(),
      Name: z.string(),
      Products: z.optional(z.array(z.string())),
    })
    .transform((obj) => ({
      id: obj["ID"],
      url: obj["URL"],
      name: obj["Name"],
      products: obj["Products"] ?? [],
    }));
