'use client';
import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';

const AuthUserProfileContext = createContext([]);

export default function AuthUserProfileProvider({ children }) {
  const session = useSession();
  const apiClient = useServerApi();

  const user = session?.data?.user;

  const { data: profile = { permissions: [] } } = useQuery({
    queryKey: ['user-permissions', user?.id],
    queryFn: async () => (await apiClient.getUserProfile())?.data ?? [],
    enabled: Boolean(user),
  });

  return (
    <AuthUserProfileContext.Provider value={profile}>
      {children}
    </AuthUserProfileContext.Provider>
  );
}

export const useAuthUserProfile = () => useContext(AuthUserProfileContext);
