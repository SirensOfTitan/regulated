import { z } from "zod";

export const product = () =>
  z
    .object({
      ID: z.string(),
      Website: z.optional(z.string().url()),
      Name: z.string(),
      Slug: z.string(),
      "Government Accreditations": z.optional(z.array(z.string())),
      "Industry Accreditations": z.optional(z.array(z.string())),
      Links: z.optional(z.array(z.string())),
      "Other Standards": z.optional(z.array(z.string())),
      "Used By": z.optional(z.array(z.string())),
      "Use Cases": z.optional(z.array(z.string())),
      "Wikipedia Slug": z.optional(z.string()),
      Description: z.optional(z.string()),
      "Last Modified": z.string().datetime(),
    })
    .transform((obj) => ({
      id: obj["ID"],
      name: obj["Name"],
      website: obj["Website"],
      description: obj["Description"],
      slug: obj["Slug"],
      accreditations: [
        ...(obj["Government Accreditations"] ?? []),
        ...(obj["Industry Accreditations"] ?? []),
      ],
      links: obj["Links"] ?? [],
      standards: obj["Other Standards"] ?? [],
      users: obj["Used By"] ?? [],
      usecases: obj["Use Cases"] ?? [],
      wikipediaSlug: obj["Wikipedia Slug"],
      lastModified: obj["Last Modified"],
    }));
