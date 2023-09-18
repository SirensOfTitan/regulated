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
      <h2 className={styles.name}>
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h2>
      <ProductAccreditations
        product={product}
        accreditations={accreditations}
      />
      <ProductUsers product={product} users={users} />
    </article>
  );
}
