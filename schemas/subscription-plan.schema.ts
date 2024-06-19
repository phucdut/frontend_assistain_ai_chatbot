import z from "zod";

export const SubscriptionPlanRes = z
  .object({
    id: z.string(),
    plan_title: z.string(),
    plan_price: z.string(),
    message_credits: z.string(),
    max_character_per_chatbot: z.string(),
    number_of_chatbots: z.number(),
    available_model: z.string(),
    is_active: z.boolean(),
    live_agent_takeover: z.boolean(),
    remove_label: z.boolean(),
    updated_at: z.date(),
    deleted_at: z.date(),
    created_at: z.date(),
  })
  .strict();

export type SubscriptionPlanResType = z.TypeOf<
  typeof SubscriptionPlanRes
>;

export const SubscriptionPlanSchema = z 
  .object({
    id: z.string(),
    plan_title: z.string(),
    plan_price: z.string(),
    message_credits: z.string(),
    max_character_per_chatbot: z.string(),
    number_of_chatbots: z.string(),
    available_model: z.string(),
    is_active: z.boolean(),
    live_agent_takeover: z.boolean(),
    remove_label: z.boolean(),
    updated_at: z.date(),
    deleted_at: z.date(),
    created_at: z.date(),
  })
  .strict();

export type EditSubscriptionPlanResType = z.TypeOf<
  typeof SubscriptionPlanSchema
>;

export const EditSubscriptionPlanSchema = z
  .object({
    plan_title: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(100, {
        message: "Password must be at most 100 characters long.",
      }),
    plan_price: z.string(),
    message_credits: z.string(),
    max_character_per_chatbot: z.string(),
    number_of_chatbots: z.string(),
    available_model: z.string(),
    live_agent_takeover: z.boolean(),
  })
  .strict();

export type EditSubscriptionPlanBodyType = z.TypeOf<
  typeof EditSubscriptionPlanSchema
>;

export type SubscriptionPlanResListType = {
  total: number;
  results: {
    id: string;
    plan_title: string;
    available_model: string;
    message_credits: number;
    max_character_per_chatbot: number;
    plan_price: number;
    number_of_chatbots: number;
    remove_label: boolean;
    is_active: boolean;
    live_agent_takeover: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: boolean | null;
  }[];
};

export const SubscriptionPlanDeleteRes = z
  .object({
    plan_id: z.string(),
    subscription_plan: z.object({
      id: z.string(),
      plan_title: z.string(),
      deleted_at: z.date(),
    }),
  })
  .strict();

export type SubscriptionPlanDeleteResType = z.TypeOf<
  typeof SubscriptionPlanDeleteRes
>;
