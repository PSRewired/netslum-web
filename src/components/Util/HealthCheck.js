'use client';

import { useQuery } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import { FaCircle } from 'react-icons/fa6';
import { Spinner } from 'react-bootstrap';

export default function HealthCheck() {
  const serverApiClient = useServerApi();

  const { isSuccess, isLoading } = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => await serverApiClient.getHealthCheck(),
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <Spinner animation="grow" size="sm" className="mb-2" />;
  }

  return <FaCircle color={isSuccess ? 'green' : 'red'} size={18} />;
}
