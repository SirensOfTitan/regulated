import { z } from "zod";
import * as search from "app/search";

const ORDER_BY_REGEX = new RegExp(
  `(${search.ORDER_BY.join("|")})-(${search.DIRECTION.join("|")})`,
);

export const searchParams = () =>
  z.object({
    query: z.optional(z.string()),
    focus: z.optional(z.literal("search")),
    order: z.optional(
      z.custom<search.PackedOrderOption>(
        (val) => typeof val === "string" && ORDER_BY_REGEX.test(val),
      ),
    ),
    accreditations: z.optional(
      z
        .union([z.string().transform((s) => [s]), z.array(z.string())])
        .transform((z) => new Set(z)),
    ),
    users: z.optional(
      z
        .union([z.string().transform((s) => [s]), z.array(z.string())])
        .transform((z) => new Set(z)),
    ),
  });
