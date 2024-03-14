'use server';

import {
  TUpdateEmailSchema,
  TUpdatePasswordSchema,
  updateEmailSchema,
  updatePasswordSchema,
} from '@/lib/types';
import { createAdminClient, createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateEmail(data: TUpdateEmailSchema) {
  const result = updateEmailSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser(data);

  revalidatePath('/');

  return { error: error ? { updateEmailError: error.message } : null };
}

export async function updatePassword(data: TUpdatePasswordSchema) {
  const result = updatePasswordSchema.safeParse(data);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return { error: zodErrors };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser(data);

  revalidatePath('/');

  return { error: error ? { updatePasswordError: error.message } : null };
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
