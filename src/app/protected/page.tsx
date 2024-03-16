import { getUser } from '@/utils/get-user/actions';
import { redirect } from 'next/navigation';
import DeleteAccountButton from './delete-account-button';
import SignOutButton from './sign-out-button';
import { UpdateCredentialsTab } from './update-credentials-tab';

export default async function Protected() {
  if (!(await getUser())) redirect('/login');

  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col gap-4'>
        <h1 className='text-center text-lg font-bold'>
          This route is protected!
        </h1>
        <UpdateCredentialsTab />
        <div className='flex flex-col items-center justify-center gap-4'>
          <SignOutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
