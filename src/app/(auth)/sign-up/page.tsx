import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import SignUpForm from './sign-up-form';

export default function SignUp() {
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
