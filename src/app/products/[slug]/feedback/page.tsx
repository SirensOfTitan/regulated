import ProductFeedback from "app/components/product/ProductFeedback";
import * as airtable from "app/integrations/airtable";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: Params) {
  const product = await airtable.cached.recordFromSlug({
    slug: params.slug,
    tableName: "Products",
  });

  return product == null
    ? {}
    : {
        title: `Suggest changes for ${product.name}`,
      };
}

interface Params {
  params: {
    slug: string;
  };
}

export default async function Feedback({ params }: Params) {
  const { slug } = params;
  const product = await airtable.cached.recordFromSlug({
    slug,
    tableName: "Products",
  });

  return product == null ? null : <ProductFeedback product={product} />;
}
