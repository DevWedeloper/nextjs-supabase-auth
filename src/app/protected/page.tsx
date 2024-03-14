import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DeleteAccountButton from './delete-account-button';
import SignOutButton from './sign-out-button';

export default async function Protected() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-center text-lg font-bold'>
          This route is protected!
        </h1>
        <div className='flex flex-col items-center justify-center gap-4'>
          <SignOutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
