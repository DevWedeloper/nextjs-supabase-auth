'use server';

import { TSignUpSchema, signUpSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';

export async function signUp(data: TSignUpSchema, url: string) {
  const result = signUpSchema.safeParse(data);
  let zodErrors: Partial<TSignUpSchema> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${url}/protected`,
    },
  });
  return { error: error ? { signUpError: error.message } : null };
}
