import ProductDetails from "app/components/product/ProductDetails";
import * as airtable from "app/integrations/airtable";
import * as collections from "app/utils/collections";
import * as wikipedia from "app/integrations/wikipedia";
import { allAccreditations } from "app/integrations/airtable/queries";

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

  const [product, allUsers, allAccreditations] = await Promise.all([
    airtable.cached.recordFromSlug({
      slug,
      tableName: "Products",
    }),
    airtable.cached.allUsers(),
    airtable.cached.allAccreditations(),
  ]);

  const extract =
    product?.wikipediaSlug == null
      ? null
      : await wikipedia.queries.extractFromTitle(product.wikipediaSlug, {
          next: {
            revalidate,
          },
        });

  return product == null ? null : (
    <ProductDetails
      product={product}
      summary={extract}
      allUsers={allUsers}
      allAccreditations={allAccreditations}
    />
  );
}
