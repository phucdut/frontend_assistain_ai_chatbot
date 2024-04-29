import z from "zod";

export const CreateKnowledgeBaseRes = z
  .object({
    nameKnowledgeBase: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
    upload: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
  })
  .strict();

export type CreateKnowledgeBaseResType = z.TypeOf<
  typeof CreateKnowledgeBaseRes
>;
