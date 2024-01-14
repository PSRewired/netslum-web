'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { getAllLobbies } from '../../clients/ServerApiClient.js';

import './lobbyPlayerList.scss';
import { DateTime } from 'luxon';
import LoadingSpinner from '../Util/LoadingSpinner.jsx';

const LobbyPlayerList = () => {
  const { data: lobbies = [], isFetching } = useQuery({
    queryKey: ['lobby-player-list'],
    queryFn: async () => (await getAllLobbies())?.data,
    refetchInterval: 10000,
  });

  return (
    <Container className="fragment-list position-relative d-flex">
      <div className="position-relative header">
        <img
          alt="logo"
          src="/images/hud/titlebar.png"
          width="186"
          height="24"
        />
        <p className="header-text">Players In Lobby</p>
      </div>
      {isFetching && (
        <Row className="absolute-center">
          <LoadingSpinner loading={true} />
        </Row>
      )}
      <Row>
        {lobbies.map((s, i) => (
          <>
            <Col key={i} xs={12}>
              {s.name}
            </Col>
            {s.players.map((p, i) => (
              <Col key={i} xs={12}>
                {p.name}
              </Col>
            ))}
          </>
        ))}
      </Row>
    </Container>
  );
};

export default LobbyPlayerList;
