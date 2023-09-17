import { Maybe } from "app/types";

export interface Accreditation {
  type: string;
  products: string[];
  kind: "gov" | "industry";
}

export interface Product {
  id: string;
  name: string;
  url: Maybe<string>;
  slug: string;
  accreditations: string[];
  users: string[];
}

export interface User {
  name: string;
  abbreviation: Maybe<string>;
}
