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
  const params = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (query === "") {
      newParams.delete("query");
    } else {
      newParams.set("query", query);
    }

    const focus = params.get("focus");
    if (focus != null) {
      newParams.set("focus", focus);
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

    if (filter.standards == null || filter.standards.size === 0) {
      newParams.delete("standards");
    } else {
      for (const acc of filter.standards) {
        newParams.append("standards", acc);
      }
    }

    if (filter.users == null || filter.users.size === 0) {
      newParams.delete("users");
    } else {
      for (const acc of filter.users) {
        newParams.append("users", acc);
      }
    }

    if (filter.usecase == null) {
      newParams.delete("usecase");
    } else {
      newParams.set("usecase", filter.usecase);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }, [filter, pathname, router, query, params]);

  return null;
}
