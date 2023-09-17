import * as airtable from "app/integrations/airtable";
import styles from "./page.module.css";
import * as schemas from "app/schemas";
import ProductList from "app/components/product/ProductList";
import { Maybe } from "app/types";

export const revalidate = 3600;

interface Props {
  searchParams: {
    query?: Maybe<string>;
  };
}

export default async function Products({ searchParams }: Props) {
  const [products, accs] = await Promise.all([
    airtable.cached.allRecordsForBase({
      baseName: "Products",
      schema: schemas.product(),
    }),
    airtable.cached.allAccreditations(),
  ]);

  // Rekey dependent types by their IDs
  const accsByID = new Map(accs.map((acc) => [acc.id, acc]));

  return (
    <>
      <ProductList
        products={products}
        accreditations={accsByID}
        initialQuery={searchParams?.query ?? ""}
      />
    </>
  );
}
