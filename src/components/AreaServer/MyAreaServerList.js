'use client';

import { Button, Container, Table } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useServerApi } from '@/hooks/useServerApi.js';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';

function formatDate(value) {
  if (!value) return '-';
  return DateTime.fromISO(value, { zone: 'utc' }).toLocaleString(
    DateTime.DATETIME_MED,
  );
}

export default function MyAreaServerList() {
  const apiClient = useServerApi();
  const queryClient = useQueryClient();

  const { data: associations = [], isFetching } = useQuery({
    queryKey: ['user-area-server-associations'],
    queryFn: async () =>
      (await apiClient.getUserAreaServerAssociations())?.data ?? [],
  });

  const removeMutation = useMutation({
    mutationFn: (associationId) =>
      apiClient.removeAreaServerAssociation(associationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user-area-server-associations'],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Container className="gap-3 d-flex flex-column">
      <h1 className="underline-primary">My Area Servers</h1>
      {isFetching && (
        <Container className="d-flex justify-content-center">
          <LoadingSpinner />
        </Container>
      )}
      <Table responsive hover>
        <thead>
          <tr>
            <th>Last Known Name</th>
            <th>Public IP</th>
            <th>Local IP</th>
            <th>Created</th>
            <th>Updated</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {associations.map((association) => (
            <tr key={association.id}>
              <td>{association.lastKnownName}</td>
              <td>{association.publicIpAddress}</td>
              <td>{association.localIpAddress}</td>
              <td>{formatDate(association.createdAt)}</td>
              <td>{formatDate(association.updatedAt)}</td>
              <td className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  disabled={
                    removeMutation.isPending &&
                    removeMutation.variables === association.id
                  }
                  onClick={() => removeMutation.mutate(association.id)}
                >
                  Remove association
                </Button>
              </td>
            </tr>
          ))}
          {!isFetching && associations.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                You have no claimed area servers.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
