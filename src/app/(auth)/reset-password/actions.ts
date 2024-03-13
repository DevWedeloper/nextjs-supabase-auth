'use server';

import { TResetPasswordSchema, resetPasswordSchema } from '@/lib/types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function resetPassword(data: TResetPasswordSchema) {
  const result = resetPasswordSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.updateUser(data);
  return { error: error ? { resetPasswordError: error.message } : null };
}
