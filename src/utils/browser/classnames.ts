import * as collections from "app/utils/collections";

type ClassName = string | Record<string, unknown> | undefined | null;
export function classnames(...names: ClassName[]): string {
  const reducedNames = names
    .flatMap((name) => {
      if (typeof name === "string") {
        return name;
      } else if (typeof name === "object" && name != null) {
        return Object.entries(name)
          .filter(([, valid]) => !!valid)
          .map(([innerName]) => innerName);
      }
    })
    .filter(collections.isNotNull);

  return Array.from(new Set(reducedNames)).join(" ");
}
