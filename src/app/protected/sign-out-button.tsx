'use client';

import { Button } from '@/components/ui/button';
import { signOut } from './actions';

export default function SignOutButton() {
  const handleClick = async () => {
    const error = await signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleClick} className='w-fit'>
      Sign-Out
    </Button>
  );
}
