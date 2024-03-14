'use server';

import { createAdminClient, createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateEmail(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    email,
  });

  revalidatePath('/');

  return { error: error ? error.message : null };
}

export async function updatePassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  revalidatePath('/');

  return { error: error ? error.message : null };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  revalidatePath('/');

  if (error) {
    return { error: error.message };
  }

  redirect('/login');
}

export async function deleteAccount() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'User not found.' };
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  revalidatePath('/');

  if (error) {
    return { error: error.message };
  }

  redirect('/login');
}
