import { Product } from "app/schemas";
import { Filter, PackedOrderOption, OrderOption, OrderBy } from "../types";
import { Maybe } from "app/types";
import * as strings from "app/utils/strings";
import { unpackOption } from "./unpackOption";
import * as collections from "app/utils/collections";

function applyQuery(product: Product, query: string): Maybe<Product> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return product;
  }

  const regex = new RegExp(strings.regexStr`${query}`, "i");
  return regex.test(product.name) ? product : null;
}

function sortComparator(order: OrderBy, x: Product, y: Product): number {
  switch (order) {
    case "numberOfAccreditations":
      return x.accreditations.length - y.accreditations.length;
    case "numberOfUsers":
      return x.users.length - y.users.length;
    case "productName":
      return x.name.localeCompare(y.name);
  }
}

function sort(products: Product[], order: Maybe<PackedOrderOption>): Product[] {
  if (order == null) {
    return products;
  }

  const [orderBy, direction] = unpackOption(order);
  return products.slice().sort((x, y) => {
    const result = sortComparator(orderBy, x, y);
    return direction === "desc" ? result - result * 2 : result;
  });
}

interface ApplyFiltersOptions {
  filter: Filter;
  query: string;
}
export function applyFilters(
  products: Product[],
  { filter, query }: ApplyFiltersOptions,
) {
  return sort(
    products
      .map((product) => {
        return applyQuery(product, query);
      })
      .filter(collections.isNotNull),
    filter.order,
  );
}
