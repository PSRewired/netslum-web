'use client';

import { Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { getOnlineAreaServers } from '../../clients/ServerApiClient.js';

import './areasServerList.scss';
import { DateTime } from 'luxon';

const AreaServerList = () => {
  const { data: areaServers = [] } = useQuery({
    queryKey: ['area-server-list'],
    queryFn: async () => (await getOnlineAreaServers())?.data,
  });

  return (
    <Table responsive striped>
      <tbody>
        <tr>
          <td>Test</td>
          <td>1</td>
          <td>Foobar</td>
          <td>4</td>
          <td>
            {DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
          </td>
        </tr>
        <tr>
          <td>Test2</td>
          <td>1</td>
          <td>Foobar</td>
          <td>4</td>
          <td>
            {DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
          </td>
        </tr>
        {areaServers.map((s, i) => (
          <tr key={i}>
            <td>{s.name}</td>
            <td>{s.level}</td>
            <td>{s.state}</td>
            <td>{s.currentPlayerCount}</td>
            <td>
              {DateTime.fromISO(s.onlineSince).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY,
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AreaServerList;
