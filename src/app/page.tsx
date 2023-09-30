import * as airtable from "app/integrations/airtable";
import ProductList from "app/components/product/ProductList";
import * as schemas from "app/schemas";
import * as wikipedia from "app/integrations/wikipedia";

export const revalidate = 3600;

interface Props {
  searchParams: unknown;
}

export default async function Products({ searchParams }: Props) {
  const [accsByID, productsByID, usersByID] = await Promise.all([
    airtable.cached.allAccreditations(),
    airtable.cached.allProducts(),
    airtable.cached.allUsers(),
  ]);

  const descriptions = await Promise.all(
    productsByID.map(async (product) => {
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
        products={productsByID}
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
