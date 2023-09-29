import { z } from "zod";
import { Maybe } from "app/types";
import { product } from "./product";
import { accreditation } from "./accreditation";
import { link } from "./link";
import { standard } from "./standard";
import { user } from "./user";
import { searchParams } from "./searchParams";

type SchemaType<T extends (...a: unknown[]) => z.ZodTypeAny> = z.infer<
  ReturnType<T>
>;
export type Accreditation = SchemaType<typeof accreditation>;
export type Product = SchemaType<typeof product>;
export type Link = SchemaType<typeof link>;
export type Standard = SchemaType<typeof standard>;
export type User = SchemaType<typeof user>;
export type SearchParams = SchemaType<typeof searchParams>;
