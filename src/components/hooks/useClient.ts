import { useEffect, useState } from "react";

/** Returns true if we're currently rendering on the clientside */
export function useClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return isClient;
}
