import Email from "next-auth/providers/email";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordSchema>;

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(100, {
        message: "Password must be at most 100 characters long.",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long.",
      })
      .max(100, {
        message: "Password must be at most 100 characters long.",
      }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpBodyType = z.infer<typeof SignUpSchema>;

export const SignUpRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type SignUpResType = z.infer<typeof SignUpRes>;

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean(),
  code: z.optional(z.string()),
});
export type SignInBodyType = z.infer<typeof SignInSchema>;

export const SignInRes = SignUpRes;

export type SignInResType = z.TypeOf<typeof SignInRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = SignUpRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;