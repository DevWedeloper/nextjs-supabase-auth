'use server';

import { TLoginSchema, loginSchema } from '@/lib/types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function login(data: TLoginSchema) {
  const result = loginSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signInWithPassword(data);
  return { error: error ? { signUpError: error.message } : null };
}
