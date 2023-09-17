"use client";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import * as strings from "app/utils/strings";
import ProductListItem from "./ProductListItem";
import styles from "./ProductList.module.css";
import { Accreditation, Product, User } from "app/schemas";
import { useRouter } from "next/router";
import { UpdateQueryString } from "../general/UpdateQueryString";

interface Props {
  products: Product[];
  accreditations: Map<string, Accreditation>;
  users: Map<string, User>;
  initialQuery: string;
}

export default function ProductList({
  products,
  accreditations,
  users,
  initialQuery,
}: Props) {
  const [queryImpl, setQuery] = useState(initialQuery);
  const query = useDeferredValue(queryImpl);

  const regex = useMemo(
    () => new RegExp(strings.regexStr`${query}`, "i"),
    [query],
  );

  const filteredProducts = useMemo(
    () => products.filter((product) => regex.test(product.name)),
    [products, regex],
  );

  return (
    <div className={styles.productList}>
      <header className={styles.header}>
        <a className={styles.logo} href="/">
          regulated.app
        </a>
        <form
          method="GET"
          className={styles.search}
          onSubmit={(ev) => {
            // Don't allow form submission when client is hydrated.
            ev.preventDefault();
          }}
        >
          <UpdateQueryString query={query} />
          <input
            name="query"
            type="text"
            value={queryImpl}
            onChange={(ev) => {
              ev.preventDefault();
              setQuery(ev.target.value);
            }}
          />
        </form>
      </header>
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
