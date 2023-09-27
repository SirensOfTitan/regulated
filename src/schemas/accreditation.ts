import { z } from "zod";

export const accreditation = () =>
  z
    .object({
      ID: z.string(),
      Type: z.string(),
      kind: z.optional(z.union([z.literal("gov"), z.literal("industry")])),
      Products: z.optional(z.array(z.string())),
      "Include in Filter": z.optional(z.boolean()),
    })
    .transform((obj) => ({
      id: obj["ID"],
      type: obj["Type"],
      kind: obj["kind"] ?? "industry",
      products: obj["Products"] ?? [],
      includeInFilter: obj["Include in Filter"] ?? false,
    }));
