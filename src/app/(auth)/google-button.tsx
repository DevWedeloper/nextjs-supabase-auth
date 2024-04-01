'use client';

import { toastError } from '@/components/toasts';
import { useTheme } from 'next-themes';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { handleGoogleAuth } from './actions';

export default function GoogleButton({
  text,
}: {
  text: 'signup_with' | 'signin_with';
}) {
  const { resolvedTheme } = useTheme();
  const [windowLoad, setWindowLoad] = useState(false);

  useEffect(() => {
    if (windowLoad) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
        callback: (response) => {
          const supabaseCallback = async () => {
            const error = await handleGoogleAuth(response);

            if (error) {
              toastError(`${error.error}`);
            }
          };

          supabaseCallback();
        },
      });
      const theme = resolvedTheme === 'dark' ? 'filled_black' : 'outline';
      google.accounts.id.renderButton(document.getElementById('google-btn')!, {
        type: 'standard',
        theme,
        text,
      });
      google.accounts.id.prompt();
    }
  }, [text, resolvedTheme, windowLoad]);

  useEffect(() => {
    if (document.readyState !== 'complete') {
      const handler = () => {
        setWindowLoad(true);
      };
      window.addEventListener('load', handler);

      return () => {
        window.removeEventListener('load', handler);
      };
    } else {
      const timeout = window.setTimeout(() => {
        setWindowLoad(true);
      }, 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <Script src='https://accounts.google.com/gsi/client' async defer></Script>
      <div id='google-btn' className='[color-scheme:auto]'></div>
    </>
  );
}
