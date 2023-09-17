/// Given a bunch of queries, create cache functions for use in react.

import { cache } from "react";
import * as queries from "./queries";
import * as objects from "app/utils/objects";
import { defaultClient } from ".";
import { AnyQuery, Query, QueryParams, QueryReturn } from "./types";

type MappedType<T> = {
  [k in keyof T]: T[k] extends Query<infer Params, infer Return>
    ? (...params: Params) => Return
    : never;
};
type MappedQueries = MappedType<typeof queries>;

export const cached = objects.mapValues<typeof queries, MappedQueries>(
  queries,
  (fn, key) => {
    return cache(
      (...args: QueryParams<typeof fn>) =>
        // Because the fn above is typed as a union of the various function values,
        // we need to erase the type so that we can generically call the function without
        // typescript freaking out.
        (fn as AnyQuery)(defaultClient, ...args) as QueryReturn<
          MappedQueries[typeof key]
        >,
    );
  },
);
