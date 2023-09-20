"use client";

import Header from "app/components/general/Header";
import { Product } from "app/schemas";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  return (
    <>
      <Header query="" onChangeQuery={() => null} product={product} />
      {JSON.stringify(product)}
    </>
  );
}
