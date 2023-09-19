import { z } from "zod";
import * as search from "app/search";
import * as strings from "app/utils/strings";

const ORDER_BY_REGEX = new RegExp(
  strings.regexStr`(${search.ORDER_BY.join(
    "|",
  )})-$(search.DIRECTION.join("|"))`,
);

export const searchParams = () =>
  z.object({
    query: z.optional(z.string()),
    orderBy: z.optional(
      z.custom<search.PackedOrderOption>(
        (val) => typeof val === "string" && ORDER_BY_REGEX.test(val),
      ),
    ),
  });
