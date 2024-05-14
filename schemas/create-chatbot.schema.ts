import { config } from "process";
import { use } from "react";
import z from "zod";

export const CreateChatbotSchema = z
  .object({
    chatbot_name: z.string(),
    description: z.string(),
    model: z.string(),
    temperature: z.string(),
    max_tokens: z.string(),
    prompt: z.string(),
    is_default: z.boolean(),
  })
  .strict();

export type CreateChatbotBodyType = z.TypeOf<typeof CreateChatbotSchema>;

export const CreateChatbotRes = z.object({
  id: z.string(),
  user_id: z.string(),
  chatbot_name: z.string(),
  model: z.string(),
  description: z.string(),
  temperature: z.string(),
  max_tokens: z.string(),
  is_default: z.boolean(),
  prompt: z.string(),
  chatbot_config: z.object({
    font_family: z.string(),
    font_size: z.string(),
    input_background: z.string(),
    background_color: z.string(),
    user_font_color: z.string(),
    prompts_font_color: z.string(),
    ally_font_color: z.string(),
    disclaimer_color: z.string(),
    input_placeholder: z.string(),
    disclaimer_text: z.string(),
    chatbot_logo: z.string(),
    website_link: z.string(),
    powered_by_remove: z.number(),
  }),
});

export type CreateChatbotResType = z.TypeOf<typeof CreateChatbotRes>;
