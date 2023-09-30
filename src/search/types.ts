import { Maybe, ElementOf } from "app/types";
import { DIRECTION, ORDER_BY } from "./constants";

export type OrderBy = ElementOf<typeof ORDER_BY>;
export type Direction = ElementOf<typeof DIRECTION>;

export type PackedOrderOption = `${OrderBy}-${Direction}`;
export interface Filter {
  order?: Maybe<PackedOrderOption>;
  accreditations?: Set<string>;
  users?: Set<string>;
  usecases?: Set<string>;
}

export type OrderOption = readonly [OrderBy, Direction];
