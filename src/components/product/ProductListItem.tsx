"use client";

import Link from "next/link";
import styles from "./ProductListItem.module.css";
import { Accreditation, Product, User } from "app/schemas";

interface TagProps {
  accreditation: Accreditation;
}
function Tag({ accreditation }: TagProps) {
  return <span className={styles.tag}>{accreditation.type}</span>;
}

interface Props {
  product: Product;
  accreditations: Map<string, Accreditation>;
  users: Map<string, User>;
}

export default function ProductListItem({ product, accreditations, users }: Props) {
  return (
    <article className={styles.productListItem}>
      <h2 className={styles.name}>
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
      </h2>
      <div className={styles.tagCloud}>
        {product.users.map((userID) => {
          const user = users.get(userID);
          return user == null ? null : <span className={styles.tag}>{user.name}</span>;
        })}
      </div>
      <div className={styles.tagCloud}>
        {product.accreditations.map((accID) => {
          const acc = accreditations.get(accID);
          return acc == null ? null : <Tag key={accID} accreditation={acc} />;
        })}
      </div>
    </article>
  );
}
