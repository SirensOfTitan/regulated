"use client";

import Link from "next/link";
import styles from "./ProductListItem.module.css";
import { Accreditation, Product, User } from "app/schemas";
import ProductAccreditations from "./ProductAccreditations";
import ProductUsers from "./ProductUsers";
import { Maybe } from "app/types";
import { useMemo } from "react";

interface Props {
  product: Product;
  accreditations: Map<string, Accreditation>;
  descriptions: Map<string, Maybe<string>>;
  users: Map<string, User>;
}

export default function ProductListItem({
  product,
  accreditations,
  descriptions,
  users,
}: Props) {
  const productID = product.id;
  const description = useMemo(
    () => descriptions.get(productID),
    [descriptions, productID],
  );
  return (
    <article className={styles.productListItem}>
      <Link
        href={`/products/${product.slug}`}
        className={styles.anchor}
        aria-label={`Product details for ${product.name}`}
      >
        {product.name} details page
      </Link>
      <div className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>
        <div className={styles.info}>
          {description == null ? null : (
            <div className={styles.description}>{description}</div>
          )}
          <ProductUsers product={product} users={users} />
          <ProductAccreditations
            product={product}
            accreditations={accreditations}
          />
        </div>
      </div>
      <div className={styles.linkIcon} />
    </article>
  );
}
