import { Filter } from "../types";

export function isFilterEmpty(filter: Filter): boolean {
  return (
    (filter.accreditations == null || filter.accreditations.size === 0) &&
    filter.order == null
  );
}
