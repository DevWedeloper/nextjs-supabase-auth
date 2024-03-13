'use server';

import { TForgotPasswordSchema, forgotPasswordSchema } from '@/lib/types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function forgotPassword(data: TForgotPasswordSchema, url: string) {
  const result = forgotPasswordSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${url}/reset-password`,
  });
  return { error: error ? { forgotPasswordError: error.message } : null };
}
