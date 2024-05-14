import z from "zod";

export const KnowledgeBaseSchema = z
  .object({
    // nameKnowledgeBase: z
    //   .string()
    //   .min(6, {
    //     message: "Name must be at least 6 characters long.",
    //   })
    //   .max(100, {
    //     message: "Name must be at most 100 characters long.",
    //   }),
    // uploadURL: z.string(),
    uploadFiles: z.any(),
  })
  .strict();

export type KnowledgeBaseBodyType = z.TypeOf<typeof KnowledgeBaseSchema>;

export const CreateKnowledgeBaseRes = z
  .object({
    chatbot_id: z.string(),
    id: z.string(),
    title: z.string(),
    content_type: z.string(),
    file_path: z.string(),
    character_count: z.string(),
    file_size: z.string(),
  })
  .strict();

export type CreateKnowledgeBaseResType = z.TypeOf<
  typeof CreateKnowledgeBaseRes
>;