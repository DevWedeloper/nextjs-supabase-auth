import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const error = searchParams.get('error');
  const errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('code');
  redirectTo.searchParams.delete('error');
  redirectTo.searchParams.delete('error_code');
  redirectTo.searchParams.delete('error_description');

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo);
    }
  }

  if (error && errorCode && errorDescription) {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60000);

    cookies().set(
      'supabase-magic-link-error',
      `${errorCode} (${error}): ${errorDescription}`,
      { expires: expirationTime },
    );
  }

  redirectTo.pathname = '/';
  return NextResponse.redirect(redirectTo);
}
