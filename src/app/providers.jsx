'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'react-bootstrap';
import { SessionProvider } from 'next-auth/react';
import AuthUserProfileProvider from '@/contexts/AuthUserProfileContext.js';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SessionProvider>
          <AuthUserProfileProvider>{children}</AuthUserProfileProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
