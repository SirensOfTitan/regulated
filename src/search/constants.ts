import * as collections from "app/utils/collections";

export const DIRECTION = ["asc", "desc"] as const;

export const ORDER_BY = [
  "productName",
  "numberOfUsers",
  "numberOfAccreditations",
] as const;

export const ORDER_OPTIONS = collections.crossProduct(ORDER_BY, DIRECTION);
