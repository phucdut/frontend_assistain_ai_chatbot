import z from 'zod'

export type ConversationResListType = {
    total: number;
    results: {
      id: string;
      conversation_name: string;
      ended_at: Date | null;
      updated_at: Date;
      deleted_at: Date | null;
      chatbot_id: string;
      rating_score: number | null;
      user_id: string;
      is_taken: string;
      created_at: Date;
      is_active: boolean;
    }[];
  };

export const JoinRes = z.object({
    status: z.number(),
  });
  
  export type JoinResType = z.TypeOf<typeof JoinRes>;


  export const LiveAgentMessageSchema = z
  .object({
    message: z.string(),
  })
  .strict();

export type LiveAgentMessageBodyType = z.TypeOf<typeof LiveAgentMessageSchema>;

export const LiveAgentMessageRes = z
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

export type LiveAgentMessageResType = z.TypeOf<typeof LiveAgentMessageRes>;