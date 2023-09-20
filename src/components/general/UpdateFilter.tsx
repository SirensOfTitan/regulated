"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import * as search from "app/search";

interface Props {
  filter: search.Filter;
  query: string;
}

export function UpdateFilter({ filter, query }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (query === "") {
      newParams.delete("query");
    } else {
      newParams.set("query", query);
    }

    if (filter.order == null) {
      newParams.delete("order");
    } else {
      newParams.set("order", filter.order);
    }

    if (filter.accreditations == null || filter.accreditations.size === 0) {
      newParams.delete("accreditations");
    } else {
      for (const acc of filter.accreditations) {
        newParams.append("accreditations", acc);
      }
    }

    if (filter.users == null || filter.users.size === 0) {
      newParams.delete("users");
    } else {
      for (const acc of filter.users) {
        newParams.append("users", acc);
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }, [filter, pathname, router, query]);

  return null;
}
