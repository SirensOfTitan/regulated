import { Filter } from "../types";

export function isFilterEmpty(filter: Filter): boolean {
  return (
    (filter.accreditations == null || filter.accreditations.size === 0) &&
    filter.order == null &&
    (filter.usecases == null || filter.usecases.size === 0) &&
    (filter.users == null || filter.users.size === 0)
  );
}
