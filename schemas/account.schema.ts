import z from "zod";

export const AccountRes = z
  .object({
    id: z.string(),
    display_name: z.string(),
    email: z.string(),
    avatar_url: z.string(),
    payment_information: z.string(),
    is_verified: z.boolean(),
    user_role: z.string(),
    is_active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export type AccountResListType = {
  total: number;
  results: {
    id: string;
    name: string;
    display_name: string;
    email: number;
    avatar_url: string;
    payment_information: string | null;
    is_verified: boolean;
    user_role: string;
    is_active: boolean;
    user_id: string;
    prompt: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: boolean | null;
  }[];
};

export const AccountSchema = z
  .object({
    display_name: z.string(),
    email: z.string(),
    // avatar_url: z.string(),
    // payment_information: z.string(),
    // is_verified: z.boolean(),
    // user_role: z.string(),
  })
  .strict();

export type AccountSchemaResType = z.TypeOf<typeof AccountSchema>;

export const UpdateAccountBody = z.object({
  email: z.string(),
  display_name: z.string(),
  // email: z.string(),
  // avatar_url: z.string(),
  // payment_information: z.string(),
  // is_verified: z.boolean(),
  // user_role: z.string(),
});

export type UpdateAccountBodyType = z.TypeOf<typeof UpdateAccountBody>;

export const ChangPasswordBody = z.object({
  email: z.string(),
  password_old: z.string(),
  password_new: z.string(),
  // avatar_url: z.string(),
  // payment_information: z.string(),
  // is_verified: z.boolean(),
  // user_role: z.string(),
});

export type ChangPasswordBodyType = z.TypeOf<typeof ChangPasswordBody>;

export const ChangPasswordRes = z.object({
  status: z.number(),
  message: z.string(),
  // avatar_url: z.string(),
  // payment_information: z.string(),
  // is_verified: z.boolean(),
  // user_role: z.string(),
});

export type ChangPasswordResType = z.TypeOf<typeof ChangPasswordRes>;

export const UserSubscriptionRes = z
  .object({
    id: z.string(),
    user_id: z.string(),
    plan_id: z.string(),
    updated_at: z.date(),
    expire_at: z.date(),
    deleted_at: z.string(),
    created_at: z.date(),
    is_active: z.boolean(),
  })
  .strict();

export type UserSubscriptionResType = z.TypeOf<typeof UserSubscriptionRes>;


export const BanRes = z.object({
  status: z.number(),
  message: z.string(),
});
export type BanResType = z.TypeOf<typeof BanRes>;

export const UnBanRes = z.object({
  status: z.number(),
  message: z.string(),
});
export type UnBanResType = z.TypeOf<typeof UnBanRes>;