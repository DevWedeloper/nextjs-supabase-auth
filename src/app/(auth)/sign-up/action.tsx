'use server';

import { TSignUpSchema, signUpSchema } from '@/lib/types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function signUp(data: TSignUpSchema) {
  const result = signUpSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signUp(data);
  return { error: error ? { signUpError: error.message } : null };
}
