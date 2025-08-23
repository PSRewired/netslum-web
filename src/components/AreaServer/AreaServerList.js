'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import './areasServerList.scss';
import { DateTime } from 'luxon';
import { AreaServerStatus, AreaServerStatusDescription } from '@/constants/AreaServerStatus.js';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';
import { useServerApi } from '@/hooks/useServerApi.js';
import Image from 'next/image';
import { MdRadioButtonChecked } from 'react-icons/md';
import { RiQuestionLine } from 'react-icons/ri';
import { ColorCodeMap } from '@/constants/TextColors.js';

function getStateDescription(state) {
  return AreaServerStatusDescription[state] ?? 'Unknown';
}

function getStateStatus(state) {
  switch (state) {
    case AreaServerStatus.Available:
      return <MdRadioButtonChecked color="green" />
    case AreaServerStatus.Busy:
      return <MdRadioButtonChecked color="red" />
    default:
      return <RiQuestionLine />
  }
}

function formatAreaServerName(name) {
  const regex = /#([WRGBY])([^#]*?)(?=#|$)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  while ((match = regex.exec(name)) !== null) {
    // Add any text before the color code
    if (match.index > lastIndex) {
      const beforeText = name.slice(lastIndex, match.index);
      if (beforeText) {
        parts.push(<span key={keyCounter++}>{beforeText}</span>);
      }
    }

    // Add the colored text (preserve all spaces, only trim if empty)
    const coloredText = match[2];
    console.log(match);
    if (coloredText) {
      parts.push(
        <span key={keyCounter++} style={{ color: ColorCodeMap[match[1]] }}>
          {coloredText}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add any remaining text
  if (lastIndex < name.length) {
    const remainingText = name.slice(lastIndex);
    if (remainingText) {
      parts.push(<span key={keyCounter++}>{remainingText}</span>);
    }
  }

  return parts;
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
            className="d-flex justify-content-start w-100 flex-xs-column flex-nowrap area-server"
          >
            <Col className="status-indicator">{getStateStatus(s.state)}</Col>
            <Col xs={5} className="ellipse overflow-x-hidden">
              {formatAreaServerName(s.name)}
            </Col>
            <Col className="flex-grow-1"/>
            <Col xs={3}>{`Level ${s.level}`}</Col>
            <Col xs={3}>{`${s.currentPlayerCount} Players`}</Col>
          </Row>
        ))}
      </Container>
  );
};

export default AreaServerList;
