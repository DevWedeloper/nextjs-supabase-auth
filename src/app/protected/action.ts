'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.signOut();

  revalidatePath('/');

  if (error) {
    return { error: error.message };
  }

  redirect('/login');
}
