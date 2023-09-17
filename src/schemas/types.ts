import { Maybe } from "app/types";

export interface Product {
  id: string;
  name: string;
  url: Maybe<string>;
  slug: string;
  accreditations: string[];
}

export interface Accreditation {
  type: string;
  products: string[];
  kind: "gov" | "industry";
}
