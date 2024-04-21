import z from "zod";

export const CreatBrainRes = z
  .object({
    name: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
    description: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
    openAIKey: z.string(),
    model: z.string(),
    promptTitle: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
    promptContent: z
      .string()
      .min(6, {
        message: "Name must be at least 6 characters long.",
      })
      .max(100, {
        message: "Name must be at most 100 characters long.",
      }),
  })
  .strict();

export type CreatBrainResType = z.TypeOf<typeof CreatBrainRes>;
