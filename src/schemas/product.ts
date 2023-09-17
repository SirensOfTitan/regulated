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
      Users: z.optional(z.array(z.string())),
    })
    .transform((obj) => ({
      id: obj["ID"],
      name: obj["Name"],
      url: obj["URL"],
      slug: obj["Slug"],
      accreditations: [
        ...(obj["Government Accreditations"] ?? []),
        ...(obj["Industry Accreditations"] ?? []),
      ],
      users: obj["Users"] ?? [],
    }));
