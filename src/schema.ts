import { z } from "zod";

export const createSchema = z.object({
  body: z.object({
    userId: z.number(),
    subscriptionId: z.number(),
  }),
});
