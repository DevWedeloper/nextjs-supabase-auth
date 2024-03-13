'use server';

import { TLoginSchema, loginSchema } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(data: TLoginSchema) {
  const result = loginSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  revalidatePath('/');

  if (!error) {
    redirect('/protected');
  }

  return { error: { signUpError: error.message } };
}
