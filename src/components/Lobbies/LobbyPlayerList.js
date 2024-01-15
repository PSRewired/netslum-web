'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import './lobbyPlayerList.scss';
import LoadingSpinner from '../Util/LoadingSpinner.jsx';
import { useServerApi } from '../../hooks/useServerApi.js';
import { Fragment } from 'react';

const LobbyPlayerList = () => {
  const serverApiClient = useServerApi();
  const { data: lobbies = [], isFetching } = useQuery({
    queryKey: ['lobby-player-list'],
    queryFn: async () => (await serverApiClient.getAllLobbies())?.data,
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
          <Fragment key={i}>
            <Col xs={12}>
              {s.name}
            </Col>
            {s.players.map((p, i) => (
              <Col xs={12}>
                {p.name}
              </Col>
            ))}
          </Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default LobbyPlayerList;
