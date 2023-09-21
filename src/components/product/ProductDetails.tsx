"use client";

import Header from "app/components/general/Header";
import { Product } from "app/schemas";
import { Maybe } from "app/types";
import styles from "./ProductDetails.module.css";
import Heading from "../general/Heading";

interface Props {
  product: Product;
  summary: Maybe<string>;
}

export default function ProductDetails({ product, summary }: Props) {
  return (
    <>
      <Header query="" onChangeQuery={() => null} product={product} />

      <article className={styles.productDetails}>
        {summary == null ? null : (
          <section className={styles.summary}>
            <Heading depth={2}>About</Heading>
            {summary}
          </section>
        )}
        <br />
        {JSON.stringify(product)}
      </article>
    </>
  );
}
