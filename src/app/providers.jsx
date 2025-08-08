'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'react-bootstrap';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
