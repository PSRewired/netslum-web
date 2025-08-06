'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import './areasServerList.scss';
import { DateTime } from 'luxon';
import { AreaServerStatusDescription } from '@/constants/AreaServerStatus.js';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';
import { useServerApi } from '@/hooks/useServerApi.js';
import Image from 'next/image';

function getStateDescription(state) {
  return AreaServerStatusDescription[state] ?? 'Unknown';
}

const AreaServerList = () => {
  const serverApiClient = useServerApi();
  const { data: areaServers = [], isFetching } = useQuery({
    queryKey: ['area-server-list'],
    queryFn: async () => (await serverApiClient.getOnlineAreaServers())?.data,
    refetchInterval: 10000
  });

  return (
      <Container className="fragment-list position-relative d-flex flex-column ">
        <div className="position-relative header">
          <Image
            alt="logo"
            src="/images/hud/titlebar.png"
            width="186"
            height="24"
          />
          <p className="header-text">Servers Online</p>
        </div>
        {isFetching && (
          <Row className="absolute-center">
            <LoadingSpinner loading={true} />
          </Row>
        )}
        {areaServers.map((s, i) => (
          <Row
            key={i}
            className="d-flex justify-content-between align-items-center w-100 flex-xs-column flex-nowrap"
          >
            <Col xs={2} lg={2} className="ellipse">
              {s.name}
            </Col>
            <Col xs={1} lg={1}>{`Level ${s.level}`}</Col>
            <Col xs={2} lg={1}>{getStateDescription(s.state)}</Col>
            <Col xs={2}>{`${s.currentPlayerCount} Players`}</Col>
            <Col xs={2} md="auto" className="text-end">
              {DateTime.fromISO(s.onlineSince).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </Col>
          </Row>
        ))}
      </Container>
  );
};

export default AreaServerList;
