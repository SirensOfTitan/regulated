"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as search from "app/search";

interface Props {
  filter: search.Filter;
  query: string;
}

export function UpdateFilter({ filter, query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (query === "") {
      newParams.delete("query");
    } else {
      newParams.set("query", query);
    }

    if (filter.orderBy == null) {
      newParams.delete("order");
    } else {
      newParams.set("order", filter.orderBy);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }, [filter, pathname, router, searchParams, query]);

  return null;
}
