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