import { Direction, OrderBy, OrderOption, PackedOrderOption } from "../types";

export function unpackOption(packed: PackedOrderOption): OrderOption {
  const [order, direction] = packed.split("-");
  return [order as OrderBy, direction as Direction];
}
