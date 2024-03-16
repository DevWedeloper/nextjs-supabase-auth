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
import { TResetPasswordSchema, resetPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { resetPassword } from './actions';

export default function ResetPasswordForm() {
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: TResetPasswordSchema) => {
    const { error } = await resetPassword(values);

    if (error) {
      if ('password' in error) {
        form.setError('password', { type: 'server', message: error.password });
      }
      if ('confirmPassword' in error) {
        form.setError('confirmPassword', {
          type: 'server',
          message: error.confirmPassword,
        });
      }
      if (
        'resetPasswordError' in error &&
        (error.resetPasswordError ===
          'New password should be different from the old password.' ||
          error.resetPasswordError.includes('Password should be at least'))
      ) {
        form.setError('password', {
          type: 'server',
          message: error.resetPasswordError,
        });
      } else if ('resetPasswordError' in error) {
        toastError(`${error.resetPasswordError}`);
      }
    }

    if (!error) {
      toastSuccess(
        'Your password has been successfully reset. You may now log in using your new credentials.',
      );
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
