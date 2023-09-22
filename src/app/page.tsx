import * as airtable from "app/integrations/airtable";
import ProductList from "app/components/product/ProductList";
import * as schemas from "app/schemas";

export const revalidate = 3600;

interface Props {
  searchParams: unknown;
}

export default async function Products({ searchParams }: Props) {
  const [products, accsByID, usersByID] = await Promise.all([
    airtable.cached.allProducts(),
    airtable.cached.allAccreditations(),
    airtable.cached.allUsers(),
  ]);

  const paramsImpl = schemas.searchParams().safeParse(searchParams);
  const parsedParams = paramsImpl.success ? paramsImpl.data : {};

  return (
    <>
      <ProductList
        products={products}
        accreditations={accsByID}
        users={usersByID}
        initialFilter={parsedParams}
        initialQuery={parsedParams.query ?? ""}
        focus={parsedParams.focus}
      />
    </>
  );
}
