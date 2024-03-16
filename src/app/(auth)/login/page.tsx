import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUser } from '@/utils/get-user/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';

export default async function Login() {
  if (await getUser()) redirect('/protected');

  return (
    <>
      <Card className='space-y-4 rounded-lg border p-4'>
        <h1 className='text-center text-lg font-bold'>Login</h1>
        <LoginForm />
      </Card>
      <p className='self-end'>
        Don&apos;t have an account?
        <Button variant='link' asChild className='ml-2 p-0'>
          <Link href='/sign-up'>Sign-Up</Link>
        </Button>
      </p>
    </>
  );
}
