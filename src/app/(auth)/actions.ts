'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

let credentialResponse: google.accounts.id.CredentialResponse;
type CredentialResponse = typeof credentialResponse;

export async function handleGoogleAuth(response: CredentialResponse) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  });

  revalidatePath('/');

  if (!error) {
    redirect('/protected');
  }

  return { error: error ? error?.message : null };
}
