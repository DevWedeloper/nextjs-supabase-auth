import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResetPasswordForm from './reset-password-form';

export default function ResetPassword() {
  return (
    <>
      <div className='space-y-4 rounded-lg border border-slate-500 p-4'>
        <h1 className='text-center text-lg font-bold'>Reset Password</h1>
        <ResetPasswordForm />
      </div>
      <p className='self-end'>
        Have an account?
        <Button variant='link' asChild className='ml-2 p-0'>
          <Link href='/login'>Login</Link>
        </Button>
      </p>
    </>
  );
}
