import { z } from "zod";

export const extractFromTitle = () =>
  z.object({
    extract: z.string(),
  });
