import { Button } from '@/components/ui/button';
import Link from 'next/link';

type AuthPageWrapperProps = {
  title: string;
  children: React.ReactNode;
  linkText: string;
  link: string;
};

export default function AuthPageWrapper({
  title,
  children,
  linkText,
  link,
}: AuthPageWrapperProps) {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <div className='flex w-[400px] flex-col'>
        <div className='space-y-4 rounded-lg border border-slate-500 p-4'>
          <h1 className='text-center text-lg font-bold'>{title}</h1>
          {children}
        </div>
        <p className='self-end'>
          {linkText}
          <Button variant='link' asChild className='ml-2 p-0'>
            <Link href={link}>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
