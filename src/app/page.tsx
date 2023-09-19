import * as airtable from "app/integrations/airtable";
import ProductList from "app/components/product/ProductList";
import { Maybe } from "app/types";
import * as schemas from "app/schemas";

export const revalidate = 3600;

interface Props {
  searchParams: unknown;
}

export default async function Products({ searchParams }: Props) {
  const [products, accs, users] = await Promise.all([
    airtable.cached.allProducts(),
    airtable.cached.allAccreditations(),
    airtable.cached.allUsers(),
  ]);

  // Rekey dependent types by their IDs
  const accsByID = new Map(accs.map((acc) => [acc.id, acc]));
  const usersByID = new Map(users.map((user) => [user.id, user]));

  const parsedParams = schemas.searchParams().parse(searchParams);

  return (
    <>
      <ProductList
        products={products}
        accreditations={accsByID}
        users={usersByID}
        initialFilter={parsedParams}
        initialQuery={parsedParams.query ?? ""}
      />
    </>
  );
}
