import { Product } from "app/schemas/types";
import { ReactNode, useMemo } from "react";
import styles from "./ProductHeader.module.css";
import Heading from "../general/Heading";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
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
  page: "product" | "feedback";
}

export default function ProductHeader({ product, page }: Props) {
  const slug = product.slug;
  const logo = useMemo(() => slugToImageName(slug), [slug]);

  const { pending } = useFormStatus();
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
        <div className={styles.spacer} />
        {page !== "product" ? null : (
          <Link
            className={styles.button}
            href={`/products/${product.slug}/feedback`}
          >
            ✍️ Suggest changes
          </Link>
        )}
        {page !== "feedback" ? null : (
          <button disabled={pending} className={styles.button} type="submit">
            👏 Submit feedback
          </button>
        )}
      </div>
      <div className={styles.actionsFill} />
    </section>
  );
}
