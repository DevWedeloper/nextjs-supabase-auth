import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ResetPasswordForm from './reset-password-form';

export default async function ResetPassword() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <Card className='space-y-4 rounded-lg border p-4'>
        <h1 className='text-center text-lg font-bold'>Reset Password</h1>
        <ResetPasswordForm />
      </Card>
      <p className='self-end'>
        Have an account?
        <Button variant='link' asChild className='ml-2 p-0'>
          <Link href='/login'>Login</Link>
        </Button>
      </p>
    </>
  );
}
