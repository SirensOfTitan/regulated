import * as airtable from "app/integrations/airtable";
import ProductList from "app/components/product/ProductList";
import { Maybe } from "app/types";

export const revalidate = 3600;

interface Props {
  searchParams: {
    query?: Maybe<string>;
  };
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

  return (
    <>
      <ProductList
        products={products}
        accreditations={accsByID}
        users={usersByID}
        initialQuery={searchParams?.query ?? ""}
      />
    </>
  );
}
