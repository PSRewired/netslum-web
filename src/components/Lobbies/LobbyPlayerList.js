'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import './lobbyPlayerList.scss';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';
import { useServerApi } from '@/hooks/useServerApi.js';
import { Fragment, useMemo } from 'react';
import Link from '@/components/Router/Link.jsx';

const LobbyPlayerList = () => {
  const serverApiClient = useServerApi();
  const { data: lobbies = [], isFetching } = useQuery({
    queryKey: ['lobby-player-list'],
    queryFn: async () => (await serverApiClient.getAllLobbies())?.data,
    refetchInterval: 10000,
  });
  
  const flattenedPlayers = useMemo(() => {
    const players = [];
    
    lobbies.forEach(lobby => {
      lobby.players.forEach(player => {
        players.push({
          lobbyId: lobby.id,
          lobbyName: lobby.name,
          ...player, 
        });
      })
    })
    
    return players;
  }, [lobbies])

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
        {flattenedPlayers.map((p, i) => (
          <Row key={i}
               className="d-flex justify-content-between align-items-center w-100 flex-xs-column flex-nowrap"
          >
            <Col xs={4} lg={6}>
            <Link href={`/akashic-records/${p.characterId}`}>{p.characterName}</Link>
            </Col>
            <Col xs={4} lg={2}>
              {p.lobbyName}
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default LobbyPlayerList;
