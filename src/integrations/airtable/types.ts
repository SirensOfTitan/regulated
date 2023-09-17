import { AirtableBase } from "airtable/lib/airtable_base";

export type Query<TParams extends any[], TReturn> = (
  client: AirtableBase,
  ...params: TParams
) => TReturn;
export type AnyQuery = Query<any, any>;

export type QueryParams<T> = T extends Query<infer TParams, any>
  ? TParams
  : never;

export type QueryReturn<T> = T extends Query<any, infer TReturn>
  ? TReturn
  : never;
