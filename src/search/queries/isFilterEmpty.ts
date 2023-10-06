import { Filter } from "../types";

export function isFilterEmpty(filter: Filter): boolean {
  return (
    (filter.accreditations == null || filter.accreditations.size === 0) &&
    filter.order == null &&
    (filter.standards == null || filter.standards.size === 0) &&
    filter.usecase == null &&
    (filter.users == null || filter.users.size === 0)
  );
}
