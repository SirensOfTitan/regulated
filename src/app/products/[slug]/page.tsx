import ProductDetails from "app/components/product/ProductDetails";
import * as airtable from "app/integrations/airtable";
import { z } from "zod";
import * as collections from "app/utils/collections";
import * as wikipedia from "app/integrations/wikipedia";
import {
  AllAccreditationsCacheType,
  AllLinksCacheType,
  AllProductsCacheType,
  AllStandardsCacheType,
  AllUsersCacheType,
} from "app/cache/types";

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
  searchParams: unknown;
}

export async function generateMetadata({ params }: Params) {
  const product = await airtable.cached.recordFromSlug({
    slug: params.slug,
    tableName: "Products",
  });

  return product == null
    ? {}
    : {
      title: `${product.name} regulations - Your guide to regulated tech products and services`,
    };
}

const searchParamsSchema = z.object({
  action: z.optional(z.literal("feedback")),
});

export default async function Product({ params, searchParams }: Params) {
  const { slug } = params;

  const [product, allUsers, allAccreditations, allLinks, allStandards] =
    await Promise.all([
      airtable.cached.recordFromSlug({
        slug,
        tableName: "Products",
      }),
      AllUsersCacheType.fetch("ALL_USERS").then(
        (as) => new Map((as ?? []).map((a) => [a.id, a])),
      ),
      AllAccreditationsCacheType.fetch("ALL_ACCREDITATIONS").then(
        (as) => new Map((as ?? []).map((a) => [a.id, a])),
      ),
      AllLinksCacheType.fetch("ALL_LINKS").then(
        (as) => new Map((as ?? []).map((a) => [a.id, a])),
      ),
      AllStandardsCacheType.fetch("ALL_STANDARDS").then(
        (as) => new Map((as ?? []).map((a) => [a.id, a])),
      ),
    ]);

  const extract =
    product?.wikipediaSlug == null
      ? null
      : await wikipedia.queries.extractFromTitle(product.wikipediaSlug, {
          next: {
            revalidate,
          },
        });

  const parsedParams = searchParamsSchema.safeParse(searchParams);
  const action = parsedParams.success ? parsedParams.data.action : null;

  return product == null ? null : (
    <ProductDetails
      action={action}
      product={product}
      summary={extract}
      allUsers={allUsers}
      allAccreditations={allAccreditations}
      allLinks={allLinks}
      allStandards={allStandards}
    />
  );
}
