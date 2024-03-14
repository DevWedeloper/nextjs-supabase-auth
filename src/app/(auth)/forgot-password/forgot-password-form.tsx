'use client';

import { toastSuccess } from '@/components/toasts';
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
import { TForgotPasswordSchema, forgotPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { forgotPassword } from './actions';

export default function ForgotPasswordForm() {
  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: TForgotPasswordSchema) => {
    const { error } = await forgotPassword(values, window.location.origin);

    if (error) {
      console.log(error);
    }

    if (!error) {
      toastSuccess(
        'A confirmation link has been sent to your email. Kindly click to confirm.',
      );
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
        <div className='flex justify-center'>
          <Button type='submit' disabled={!form.formState.isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
