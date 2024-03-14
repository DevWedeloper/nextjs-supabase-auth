'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UpdatePassword() {
  const handleClick = async () => {
    console.log('clicked');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='new-password'>New password</Label>
          <Input id='new-password' type='password' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='confirm-password'>Confirm password</Label>
          <Input id='confirm-password' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick}>Save password</Button>
      </CardFooter>
    </Card>
  );
}
