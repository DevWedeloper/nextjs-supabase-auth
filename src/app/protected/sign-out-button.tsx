'use client';

import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { signOut } from './actions';

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const error = await signOut();
    setIsLoading(false);

    if (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} className='w-fit'>
      {isLoading ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
      Sign-Out
    </Button>
  );
}
