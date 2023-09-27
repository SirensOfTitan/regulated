import ProductDetails from "app/components/product/ProductDetails";
import * as airtable from "app/integrations/airtable";
import * as collections from "app/utils/collections";
import * as wikipedia from "app/integrations/wikipedia";

// Ensures that we properly show a 404 when hitting a route not included
// in the set defined by generateStaticParams.
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await airtable.queries.allProducts(airtable.defaultClient);

  return products
    .map((product) =>
      product.slug == null ? null : { slug: product.slug, name: product.name },
    )
    .filter(collections.isNotNull);
}

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const product = await airtable.cached.recordFromSlug({
    slug: params.slug,
    tableName: "Products",
  });

  return product == null
    ? {}
    : {
        title: product.name,
      };
}

export default async function Product({ params }: Params) {
  const { slug } = params;

  const [product, allUsers, allAccreditations, allStandards] =
    await Promise.all([
      airtable.cached.recordFromSlug({
        slug,
        tableName: "Products",
      }),
      airtable.cached.allUsers(),
      airtable.cached.allAccreditations(),
      airtable.cached.allStandards(),
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
      allStandards={allStandards}
    />
  );
}
