"use client";
import { useDeferredValue, useMemo, useState } from "react";
import ProductListItem from "./ProductListItem";
import styles from "./ProductList.module.css";
import { Accreditation, Product, User } from "app/schemas";
import { UpdateFilter } from "app/components/general/UpdateFilter";
import ProductListFilter from "./ProductListFilter";
import * as search from "app/search";
import { applyFilters } from "app/search/utils/applyFilters";
import Header from "../general/Header";
import { Maybe } from "app/types";

interface Props {
  products: Product[];
  accreditations: Map<string, Accreditation>;
  users: Map<string, User>;
  initialQuery: string;
  initialFilter: search.Filter;
  focus?: Maybe<"search">;
}

export default function ProductList({
  products,
  accreditations,
  users,
  initialFilter,
  initialQuery,
  focus,
}: Props) {
  const [queryImpl, setQuery] = useState(initialQuery);
  const query = useDeferredValue(queryImpl);

  const [filter, setFilter] = useState(initialFilter);

  const filteredProducts = useMemo(
    () =>
      applyFilters(products, {
        filter,
        query,
      }),
    [products, filter, query],
  );

  return (
    <div className={styles.productList}>
      <form
        method="GET"
        onSubmit={(ev) => {
          // Don't allow form submission when client is hydrated.
          ev.preventDefault();
        }}
      >
        <UpdateFilter filter={filter} query={query} />
        <Header
          query={queryImpl}
          onChangeQuery={setQuery}
          autoFocus={focus === "search"}
        />
        <p className={styles.headerText}>
          Discover cloud products and infrastructure accredited for and selling
          into regulated industries.
        </p>
        <ProductListFilter
          filter={filter}
          onChange={setFilter}
          accreditations={accreditations}
          users={users}
        />
      </form>
      <ul className={styles.list}>
        {filteredProducts.map((product) => (
          <li key={product.id} className={styles.listItem}>
            <ProductListItem
              product={product}
              accreditations={accreditations}
              users={users}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
