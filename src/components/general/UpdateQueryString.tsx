"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  /** The query string, should be deferred so we're not updating too often */
  query: string;
}

export function UpdateQueryString({ query }: Props) {
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

    router.push(`${pathname}?${newParams.toString()}`);
  }, [query, pathname, router, searchParams]);

  return null;
}
