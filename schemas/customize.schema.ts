import z from "zod";

export const CustomizeRes = z
  .object({
    prompts: z.string(),
    initPrompts: z.string(),
    showInit: z.boolean(),
    showSuggest: z.boolean(),
    chatOpen: z.boolean(),
    remove: z.boolean(),
    hideMicrophone: z.boolean(),
  })
  .strict();

export type CustomizeResType = z.TypeOf<typeof CustomizeRes>;
