import { z } from "zod";
import * as search from "app/search";

const ORDER_BY_REGEX = new RegExp(
  `(${search.ORDER_BY.join("|")})-(${search.DIRECTION.join("|")})`,
);

export const searchParams = () =>
  z.object({
    query: z.optional(z.string()),
    order: z.optional(
      z.custom<search.PackedOrderOption>(
        (val) => typeof val === "string" && ORDER_BY_REGEX.test(val),
      ),
    ),
  });
