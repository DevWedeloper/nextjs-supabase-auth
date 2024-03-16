import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUser } from '@/utils/get-user/actions';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ForgotPasswordForm from './forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default async function ForgotPassword() {
  if (await getUser()) redirect('/protected');

  return (
    <>
      <Card className='space-y-4 rounded-lg border p-4'>
        <h1 className='text-center text-lg font-bold'>Forgot Password</h1>
        <ForgotPasswordForm />
      </Card>
      <p className='self-end'>
        Have an account?
        <Button variant='link' asChild className='ml-2 p-0 !text-blue-600'>
          <Link href='/login'>Login</Link>
        </Button>
      </p>
    </>
  );
}
