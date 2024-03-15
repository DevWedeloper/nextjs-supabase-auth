'use server';

import { TResetPasswordSchema, resetPasswordSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';

export async function resetPassword(data: TResetPasswordSchema) {
  const result = resetPasswordSchema.safeParse(data);
  let zodErrors: Partial<TResetPasswordSchema> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser(data);
  return { error: error ? { resetPasswordError: error.message } : null };
}
