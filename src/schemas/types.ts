import { Maybe } from "app/types";

export interface Accreditation {
  id: string;
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
  id: string;
  name: string;
  abbreviation: Maybe<string>;
}
