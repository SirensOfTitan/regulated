import { Product, User } from "app/schemas";
import { Filter, PackedOrderOption, OrderBy } from "../types";
import { Maybe } from "app/types";
import * as strings from "app/utils/strings";
import { unpackOption } from "./unpackOption";
import * as collections from "app/utils/collections";

function applyAccreditations(
  product: Maybe<Product>,
  accreditations: Maybe<Set<string>>,
): Maybe<Product> {
  if (product == null) {
    return null;
  }

  // If no accreditations are selected, select them all.
  if (accreditations == null || accreditations.size === 0) {
    return product;
  }

  if (
    collections.setIntersection(product.accreditations, accreditations).size <=
    0
  ) {
    return null;
  }

  return product;
}

function applyUsers(
  product: Maybe<Product>,
  users: Maybe<Set<string>>,
  usersMap: Maybe<Map<string, User>>,
): Maybe<Product> {
  if (product == null || usersMap == null) {
    return null;
  }

  // If no users are selected, select them all.
  if (users == null || users.size === 0) {
    return product;
  }

  const userTypes = product.users.map((u) => usersMap.get(u)?.type);
  if (collections.setIntersection(userTypes, users).size <= 0) {
    return null;
  }

  return product;
}

function applyQuery(product: Maybe<Product>, query: string): Maybe<Product> {
  if (product == null) {
    return null;
  }

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
    order = "productName-asc";
  }

  const [orderBy, direction] = unpackOption(order);
  return products.slice().sort((x, y) => {
    const result = sortComparator(orderBy, x, y);
    return direction === "desc" ? result - result * 2 : result;
  });
}

interface ApplyFiltersOptions {
  filter: Filter;
  usersMap: Map<string, User>;
  query: string;
}
export function applyFilters(
  products: Product[],
  { filter, query, usersMap }: ApplyFiltersOptions,
) {
  return sort(
    products
      .map((product) => {
        return applyUsers(
          applyAccreditations(
            applyQuery(product, query),
            filter.accreditations,
          ),
          filter.users,
          usersMap,
        );
      })
      .filter(collections.isNotNull),
    filter.order,
  );
}
