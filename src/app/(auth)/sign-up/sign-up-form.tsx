'use client';

import { toastError, toastSuccess } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TSignUpSchema, signUpSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import GoogleButton from '../google-button';
import { signUp } from './action';

export default function SignUpForm() {
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: TSignUpSchema) => {
    const { error } = await signUp(values, window.location.origin);

    if (error) {
      if ('email' in error) {
        form.setError('email', { type: 'server', message: error.email });
      }
      if ('password' in error) {
        form.setError('password', { type: 'server', message: error.password });
      }
      if ('confirmPassword' in error) {
        form.setError('confirmPassword', {
          type: 'server',
          message: error.confirmPassword,
        });
      }
      if ('signUpError' in error) {
        toastError(`${error.signUpError}`);
        form.setError('root', { type: 'server', message: error.signUpError });
      }
    }

    if (!error) {
      toastSuccess(
        'A confirmation link has been sent to your email. Kindly click to confirm.',
      );
      form.reset();
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
              <FormDescription>
                Password must be at least 8 characters and contain at least one
                lowercase letter, one uppercase letter, one digit, and one
                special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <GoogleButton text='signup_with' />
        </div>
      </form>
    </Form>
  );
}
