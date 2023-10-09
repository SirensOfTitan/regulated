import { AllProductsCacheType } from "app/cache/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Just go and generate these manually, no reason to explore next manifests for now.
  const products = await AllProductsCacheType.fetch("ALL_PRODUCTS").then(
    (xs) => xs ?? [],
  );

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://regulated.app/products/${product.slug}`,
    lastModified: product.lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Assume the index was last modified when the last product was modified.
  const indexLastModified = products
    .map((p) => p.lastModified)
    .reduce((acc, val) => (acc == null || val > acc ? val : acc));

  return (
    [
      {
        url: `https://regulated.app`,
        lastModified: indexLastModified,
        priority: 1,
        changeFrequency: "weekly",
      },
    ] as MetadataRoute.Sitemap
  ).concat(productPages);
}
