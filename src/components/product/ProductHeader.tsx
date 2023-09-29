import { Product } from "app/schemas/types";
import { ReactNode, useMemo } from "react";
import styles from "./ProductHeader.module.css";
import Heading from "../general/Heading";
import { Maybe } from "app/types";
import Image from "next/image";
import Link from "next/link";

function slugToImageName(slug: string): Maybe<string> {
  switch (slug) {
    case "arcgis":
      return "arcgis.png";
    default:
      return null;
  }
}

interface Props {
  logo?: ReactNode;
  product: Product;
}

export default function ProductHeader({ product }: Props) {
  const slug = product.slug;
  const logo = useMemo(() => slugToImageName(slug), [slug]);

  return (
    <section className={styles.productHeader}>
      <div className={styles.logo}>
        <Image
          className={styles.image}
          src={`/products/${logo}`}
          fill
          alt={`Logo for ${product.name}`}
        />
      </div>
      <div className={styles.basic}>
        <Heading className={styles.name} depth={2}>
          {product.name}
        </Heading>
        {product.description}
      </div>
      <div className={styles.actions}>
        {product.website == null ? null : (
          <a className={styles.button} href={product.website}>
            🔗 Visit website
          </a>
        )}
        <Link
          className={styles.button}
          href={`/products/${product.slug}/feedback`}
        >
          ✍️ Suggest changes
        </Link>
      </div>
      <div className={styles.actionsFill} />
    </section>
  );
}
