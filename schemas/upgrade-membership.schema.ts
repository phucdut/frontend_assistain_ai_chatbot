import z from "zod";

export type UpgradeMembershipListType = {
    total: number;
    results: {
      id: string;
      available_model: string;
      plan_title: string;
      number_of_chatbots: number;
      plan_price: number;
      updated_at: Date;
      deleted_at: Date | null;
      model: string;
      message_credits: number;
      max_character_per_chatbot: number;
      remove_label: boolean;
      created_at: Date;
      live_agent_takeover: boolean;
      is_active: boolean;
    }[];
  };