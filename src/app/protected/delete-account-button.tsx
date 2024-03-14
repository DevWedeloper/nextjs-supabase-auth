'use client';

import { toastSuccess } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { deleteAccount } from './actions';

export default function DeleteAccountButton() {
  const handleClick = async () => {
    const error = await deleteAccount();

    if (error) {
      console.log(error);
    }

    if (!error) {
      toastSuccess(
        'Account successfully deleted! Thank you for using my app ❤️',
      );
    }
  };

  return (
    <Button onClick={handleClick} variant='destructive' className='w-fit'>
      Delete Account
    </Button>
  );
}
