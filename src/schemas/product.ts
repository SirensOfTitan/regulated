import { z } from "zod";

export const product = () =>
  z
    .object({
      ID: z.string(),
      Name: z.string(),
      URL: z.optional(z.string().url()),
      Slug: z.string(),
      "Government Accreditations": z.optional(z.array(z.string())),
      "Industry Accreditations": z.optional(z.array(z.string())),
      Links: z.optional(z.array(z.string())),
      "Other Standards": z.optional(z.array(z.string())),
      "Used By": z.optional(z.array(z.string())),
      "Wikipedia Slug": z.optional(z.string()),
      Description: z.optional(z.string()),
    })
    .transform((obj) => ({
      id: obj["ID"],
      name: obj["Name"],
      description: obj["Description"],
      url: obj["URL"],
      slug: obj["Slug"],
      accreditations: [
        ...(obj["Government Accreditations"] ?? []),
        ...(obj["Industry Accreditations"] ?? []),
      ],
      links: obj["Links"] ?? [],
      standards: obj["Other Standards"] ?? [],
      users: obj["Used By"] ?? [],
      wikipediaSlug: obj["Wikipedia Slug"],
    }));
