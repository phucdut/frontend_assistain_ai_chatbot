import z, { deoptional } from "zod";

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
    is_active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date(),
  })
  .strict();

export type CreateKnowledgeBaseResType = z.TypeOf<
  typeof CreateKnowledgeBaseRes
>;

export type KnowledgeBaseResListType = {
  id: string;
  chatbot_id: string;
  title: string;
  content_type: string;
  file_path: string;
  character_count: number;
  file_size: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}[];

export const KnowledgeBaseRes = z
  .object({
    chatbot_id: z.string(),
    knowledge_base: z.object({
      id: z.string(),
      knowledge_base_name: z.string(),
      deleted_at: z.date(),
    }),
  })
  .strict();

export type KnowledgeBaseResType = z.TypeOf<typeof KnowledgeBaseRes>;



export const SearchSchema = z
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
    message: z.any(),
  })
  .strict();