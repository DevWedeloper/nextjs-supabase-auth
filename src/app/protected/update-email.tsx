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

export default function UpdateEmail() {
  const handleClick = async () => {
    console.log('clicked');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>
          Make changes to your email here. A link will be sent to your old and
          new email. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick}>Save changes</Button>
      </CardFooter>
    </Card>
  );
}
