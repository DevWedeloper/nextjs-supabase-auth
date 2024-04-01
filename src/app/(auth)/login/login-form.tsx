'use client';

import { toastError } from '@/components/toasts';
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
import { Separator } from '@/components/ui/separator';
import { TLoginSchema, loginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import GoogleButton from '../google-button';
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
      if ('email' in error.error) {
        form.setError('email', { type: 'server', message: error.error.email });
      }
      if ('password' in error.error) {
        form.setError('password', {
          type: 'server',
          message: error.error.password,
        });
      }
      if ('loginError' in error.error) {
        toastError(`${error.error.loginError}`);
        form.setError('root', {
          type: 'server',
          message: error.error.loginError,
        });
      }
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
            {form.formState.isSubmitting && (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            Submit
          </Button>
        </div>
        <Separator />
        <div className='flex justify-center'>
          <GoogleButton text='signin_with' />
        </div>
      </form>
    </Form>
  );
}
