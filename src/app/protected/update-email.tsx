'use client';

import { toastError, toastSuccess } from '@/components/toasts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TUpdateEmailSchema, updateEmailSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { updateEmail } from './actions';

export default function UpdateEmail() {
  const form = useForm<TUpdateEmailSchema>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: TUpdateEmailSchema) => {
    const { error } = await updateEmail(values, window.location.origin);

    if (error) {
      if ('email' in error) {
        form.setError('email', { type: 'server', message: error.email });
      }
      if (
        'updateEmailError' in error &&
        error.updateEmailError === 'Email should be a new one.'
      ) {
        form.setError('email', {
          type: 'server',
          message: error.updateEmailError,
        });
      } else if ('updateEmailError' in error) {
        toastError(`${error.updateEmailError}`);
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
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>
          Make changes to your email here. A link will be sent to your old and
          new email. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='space-y-2'>
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
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              Save changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
