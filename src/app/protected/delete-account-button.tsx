'use client';

import { toastSuccess } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { deleteAccount } from './actions';

export default function DeleteAccountButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const error = await deleteAccount();
    setIsLoading(false);

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
    <Button
      onClick={handleClick}
      variant='destructive'
      disabled={isLoading}
      className='w-fit'
    >
      {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
      Delete Account
    </Button>
  );
}
