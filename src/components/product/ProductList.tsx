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
    <form
      method="GET"
      onSubmit={(ev) => {
        // Don't allow form submission when client is hydrated.
        ev.preventDefault();
      }}
    >
    <div className={styles.productList}>
        <UpdateFilter filter={filter} query={query} />
        <Header
          query={queryImpl}
          onChangeQuery={setQuery}
          autoFocus={focus === "search"}
        />
        <p className={styles.headerText}>
          Discover cloud products and infrastructure accredited for and selling
          into regulated industries. Information is aggregated from publicly
          availiable sources including the{" "}
          <a href="https://marketplace.fedramp.gov/products">
            FedRAMP Marketplace
          </a>
          , <a href="https://www.disa.mil/NewsandEvents">DISA press releases</a>
          ,{" "}
          <a href="https://stateramp.org/product-list/">
            StateRAMP Authorized Products list
          </a>
          , <a href="https://www.usaspending.gov/">USAspending</a>,{" "}
          <a href="https://www.gsa.gov/buy-through-us/purchasing-programs/gsa-multiple-award-schedule">
            GSA Multiple Award Schedules
          </a>
          , and vendor websites.
        </p>
        <ProductListFilter
          filter={filter}
          onChange={setFilter}
          accreditations={accreditations}
          users={users}
        />
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
      </form>
  );
}
