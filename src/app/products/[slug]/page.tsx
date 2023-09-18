import * as airtable from "app/integrations";
import * as collections from "app/utils/collections";
import { cache } from "react";

// Ensures that we properly show a 404 when hitting a route not included
// in the set defined by generateStaticParams.
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await airtable.queries.allProducts(airtable.defaultClient);

  return products
    .map((product) => (product.slug == null ? null : { slug: product.slug }))
    .filter(collections.isNotNull);
}

interface Params {
  params: {
    slug: string;
  };
}

export default async function Product({ params }: Params) {
  const { slug } = params;

  const product = await airtable.cached.recordFromSlug({
    slug,
    tableName: "Products",
  });

  return <pre>{JSON.stringify(product)}</pre>;
}
