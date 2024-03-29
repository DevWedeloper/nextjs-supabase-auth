import { getUser } from '@/utils/get-user/actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import DeleteAccountButton from './delete-account-button';
import SignOutButton from './sign-out-button';
import { UpdateCredentialsTab } from './update-credentials-tab';

export const metadata: Metadata = {
  title: 'Protected',
};

export default async function Protected() {
  if (!(await getUser())) redirect('/login');

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col gap-4'>
        <h2 className='text-center text-lg font-bold'>
          This route is protected!
        </h2>
        <UpdateCredentialsTab />
        <div className='flex flex-col items-center justify-center gap-4'>
          <SignOutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
