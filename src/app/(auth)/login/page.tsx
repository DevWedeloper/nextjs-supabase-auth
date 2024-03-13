import { Button } from '@/components/ui/button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';

export default async function Login() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/protected');
  }

  return (
    <>
      <div className='space-y-4 rounded-lg border border-slate-500 p-4'>
        <h1 className='text-center text-lg font-bold'>Login</h1>
        <LoginForm />
      </div>
      <p className='self-end'>
        Don&apos;t have an account?
        <Button variant='link' asChild className='ml-2 p-0'>
          <Link href='/sign-up'>Sign-Up</Link>
        </Button>
      </p>
    </>
  );
}
