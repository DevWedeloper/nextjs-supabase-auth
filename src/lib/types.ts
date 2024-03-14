import { z } from 'zod';

const emailSchema = z.string().email({
  message: 'Please enter a valid email address.',
});

const passwordSchema = z
  .string()
  .min(8, {
    message: 'Password must be at least 8 characters.',
  })
  .refine((value) => /^(?=.*[a-z])/.test(value), {
    message: 'Password must contain at least one lowercase letter.',
  })
  .refine((value) => /^(?=.*[A-Z])/.test(value), {
    message: 'Password must contain at least one uppercase letter.',
  })
  .refine((value) => /^(?=.*\d)/.test(value), {
    message: 'Password must contain at least one digit.',
  })
  .refine((value) => /[\p{P}\p{S}]/u.test(value), {
    message: 'Password must contain at least one special character.',
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const updateEmailSchema = z.object({
  email: emailSchema,
});

export type TUpdateEmailSchema = z.infer<typeof updateEmailSchema>;

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
