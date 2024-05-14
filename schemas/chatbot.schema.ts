import z from "zod";

export const ChatbotSchema = z
  .object({
    id: z.string(),
    chatbot_name: z.string(),
    description: z.string(),
    max_tokens: z.number(),
    model: z.string(),
    temperature: z.number(),
    is_default: z.boolean(),
    user_id: z.string(),
    prompt: z.string(),
  })
  .strict();

export type ChatbotResType = z.TypeOf<typeof ChatbotSchema>;

export type ChatbotResListType = {
  total: number;
  results: {
    id: string;
    chatbot_name: string;
    description: string;
    max_tokens: number;
    updated_at: Date;
    deleted_at: Date | null;
    model: string;
    temperature: number;
    is_default: boolean;
    user_id: string;
    prompt: string;
    created_at: Date;
    is_active: boolean;
  }[];
};

export const ChatbotRes = z
  .object({
    total: z.number(),
    results: z
      .object({
        id: z.string(),
        chatbot_name: z.string(),
        description: z.string(),
        max_tokens: z.number(),
        updated_at: z.date(),
        deleted_at: z.string(),
        model: z.string(),
        temperature: z.number(),
        is_default: z.boolean(),
        user_id: z.string(),
        prompt: z.string(),
        created_at: z.date(),
        is_active: z.boolean(),
      })
      .array(),
  })
  .strict();

export type ChatbotListResType = z.TypeOf<typeof ChatbotRes>;

// export type ChatbotMessageRes = {
//   message: z.string;
// };

export const ChatbotMessageSchema = z
  .object({
    message: z.string(),
  })
  .strict();

export type ChatbotMessageBodyType = z.TypeOf<typeof ChatbotMessageSchema>;

export const ChatbotMessageRes = z
  .object({
    id: z.string(),
    sender_id: z.string(),
    message: z.string(),
    sender_type: z.number(),
    updated_at: z.date(),
    deleted_at: z.string(),
    conversation_id: z.string(),
    created_at: z.date(),
    is_active: z.boolean(),
  })
  .strict();

export type ChatbotMessageResType = z.TypeOf<typeof ChatbotMessageRes>;

export type ChatbotResMessageType = {
  id: string;
  message: string;
  sender_id: string;
  sender_type: number;
  updated_at: Date;
  deleted_at: string;
  conversation_id: string;
  created_at: Date;
  is_active: boolean;
}[];

export const conversationIdRes = z.object({
  access_token: z.string(),
});

export type conversationIdResType = z.TypeOf<typeof conversationIdRes>;
