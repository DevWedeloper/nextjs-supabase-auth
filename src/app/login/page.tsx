import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoginForm from './login-form';

export default function Login() {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col'>
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
      </div>
    </div>
  );
}
