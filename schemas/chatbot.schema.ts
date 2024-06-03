import z from "zod";

export const ChatbotSchema = z
  .object({
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
    sender_type: z.string(),
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

export const ConversationIdRes = z.object({
  Conversation_id: z.string(),
});

export type ConversationIdResType = z.TypeOf<typeof ConversationIdRes>;

export const UpdateChatbotBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateChatbotBodyType = z.TypeOf<typeof UpdateChatbotBody>;

// export const ConversationRes = z.object({
//   Conversation_id: z.string(),
// });

// // export const SignInRes = SignUpRes;

// export type ConversationResType = z.TypeOf<typeof ConversationRes>;



export const EditChatbotSchema = z
  .object({
    user_id: z.string(),
    chatbot_name: z.string(),
    description: z.string(),
    model: z.string(),
    temperature: z.string(),
    max_tokens: z.string(),
    prompt: z.string(),
    is_default: z.boolean(),
  })
  .strict();

export type EditChatbotBodyType = z.TypeOf<typeof EditChatbotSchema>;

export const EditChatbotRes = z.object({
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

export type EditChatbotResType = z.TypeOf<typeof EditChatbotRes>;


export const ChatbotDeleteRes = z
  .object({
    user_id: z.string(),
    chatbot: z.object({
      id: z.string(),
      chatbot_name: z.string(),
      deleted_at: z.date(),
    }),
  })
  .strict();

export type ChatbotDeleteResType = z.TypeOf<typeof ChatbotDeleteRes>;

