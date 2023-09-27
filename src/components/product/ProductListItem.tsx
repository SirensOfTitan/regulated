"use client";

import Link from "next/link";
import styles from "./ProductListItem.module.css";
import { Accreditation, Product, User } from "app/schemas";
import ProductAccreditations from "./ProductAccreditations";
import ProductUsers from "./ProductUsers";

interface Props {
  product: Product;
  accreditations: Map<string, Accreditation>;
  users: Map<string, User>;
}

export default function ProductListItem({
  product,
  accreditations,
  users,
}: Props) {
  return (
    <article className={styles.productListItem}>
      <Link href={`/products/${product.slug}`} className={styles.anchor} aria-label={`Product details for ${product.name}`} />
      <div className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>
        <div className={styles.info}>
          <ProductAccreditations
            product={product}
            accreditations={accreditations}
          />
          <ProductUsers product={product} users={users} />
        </div>
      </div>
      <div className={styles.linkIcon} />
    </article>
  );
}
