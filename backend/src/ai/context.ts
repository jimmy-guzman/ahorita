import { z } from "zod";

export const chatContextSchema = z.object({ userId: z.string() });

export type ChatContext = z.infer<typeof chatContextSchema>;

export const getChatContext = (context: unknown): ChatContext => {
  return chatContextSchema.parse(context);
};
