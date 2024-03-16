'use client';

import { useEffect } from 'react';
import { toastError } from './toasts';

export default function MagicLinkError() {
  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('supabase-magic-link-error='));

    if (cookieValue) {
      const errorDescription = decodeURIComponent(cookieValue.split('=')[1]);
      toastError(errorDescription);
      document.cookie =
        'supabase-magic-link-error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }, []);

  return <></>;
}
