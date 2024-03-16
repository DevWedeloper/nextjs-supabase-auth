import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUser } from '@/utils/get-user/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignUpForm from './sign-up-form';

export default async function SignUp() {
  if (await getUser()) redirect('/protected');

  return (
    <>
      <Card className='space-y-4 rounded-lg border p-4'>
        <h1 className='text-center text-lg font-bold'>Sign-Up</h1>
        <SignUpForm />
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
