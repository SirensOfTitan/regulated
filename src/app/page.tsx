import ProductList from "app/components/product/ProductList";
import * as schemas from "app/schemas";
import * as wikipedia from "app/integrations/wikipedia";
import {
  AllAccreditationsCacheType,
  AllProductsCacheType,
  AllUsersCacheType,
} from "app/cache/types";
import { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  searchParams: unknown;
}

export default async function Products({ searchParams }: Props) {
  const [accs, products, users] = await Promise.all([
    AllAccreditationsCacheType.fetch("ALL_ACCREDITATIONS"),
    AllProductsCacheType.fetch("ALL_PRODUCTS").then((p) => p ?? []),
    AllUsersCacheType.fetch("ALL_USERS"),
  ]);

  const accsByID = new Map((accs ?? []).map((a) => [a.id, a]));
  const usersByID = new Map((users ?? []).map((u) => [u.id, u]));

  const descriptions = await Promise.all(
    products.map(async (product) => {
      if (
        product.description != null &&
        product.description.trim().length !== 0
      ) {
        return [product.id, product.description] as const;
      }

      if (product.wikipediaSlug == null) {
        return [product.id, null] as const;
      }

      const wikipediaText = await wikipedia.queries.extractFromTitle(
        product.wikipediaSlug,
        {
          next: {
            revalidate,
          },
        },
      );

      return [product.id, wikipediaText] as const;
    }),
  );

  const descriptionsByID = new Map(descriptions);

  const paramsImpl = schemas.searchParams().safeParse(searchParams);
  const parsedParams = paramsImpl.success ? paramsImpl.data : {};

  return (
    <>
      <ProductList
        products={products}
        accreditations={accsByID}
        users={usersByID}
        descriptions={descriptionsByID}
        initialFilter={parsedParams}
        initialQuery={parsedParams.query ?? ""}
        focus={parsedParams.focus}
      />
    </>
  );
}
