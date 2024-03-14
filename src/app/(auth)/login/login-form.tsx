'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TLoginSchema, loginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { login } from './action';

export default function LoginForm() {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: TLoginSchema) => {
    const error = await login(values);

    if (error) {
      console.log(error);
    }

    if (!error) {
      console.log('No error!');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='link' asChild className='p-0'>
          <Link href='/forgot-password'>Forgot Password?</Link>
        </Button>
        <div className='flex justify-center'>
          <Button
            type='submit'
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
