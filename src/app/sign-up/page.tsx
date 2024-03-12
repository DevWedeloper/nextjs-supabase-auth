import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SignUpForm from './sign-up-form';

export default function SignUp() {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col'>
        <div className='space-y-4 rounded-lg border border-slate-500 p-4'>
          <h1 className='text-center text-lg font-bold'>Sign-Up</h1>
          <SignUpForm />
        </div>
        <p className='self-end'>
          Have an account?
          <Button variant='link' asChild className='ml-2 p-0'>
            <Link href='/login'>Login</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
