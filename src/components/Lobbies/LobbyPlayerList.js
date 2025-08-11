'use client';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import './lobbyPlayerList.scss';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';
import { useServerApi } from '@/hooks/useServerApi.js';
import { useMemo } from 'react';
import Link from '@/components/Router/Link.jsx';
import Image from 'next/image';
import CharacterCard from '@/components/Cards/CharacterCard.jsx';
import FragmentTextBox from '@/components/Cards/FragmentTextBox.jsx';

const LobbyPlayerList = () => {
  const serverApiClient = useServerApi();

  const { data: onlinePlayers = [], isFetching: isFetchingPlayers } = useQuery({
    queryKey: ['players-online'],
    queryFn: async () => (await serverApiClient.getOnlinePlayers())?.data,
    refetchInterval: 10000,
  });

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
        <Image
          alt="logo"
          src="/images/hud/titlebar.png"
          width="186"
          height="24"
        />
        <p className="header-text">Players Online</p>
      </div>
      {isFetching && (
        <Row className="absolute-center">
          <LoadingSpinner loading={true} />
        </Row>
      )}
      {onlinePlayers?.filter(p => p.characterId > 0).map((p, i) =>
        <OnlinePlayer key={i} player={p} playersInLobbies={flattenedPlayers}  />)}
    </Container>
  );
};

function OnlinePlayer({player, playersInLobbies = []}) {

  const chatLobbyPlayer = playersInLobbies.find((p) => p.characterId === player.characterId);

  return (
    <Container className="d-flex flex-column" style={{maxWidth: '30%'}} as={Link}  href={`/akashic-records/${player.characterId}`}>
      <CharacterCard character={player} showStats={false} showGreeting={false}/>
      {chatLobbyPlayer && <FragmentTextBox>
      {`Lobby: ${chatLobbyPlayer?.lobbyName}`}
      </FragmentTextBox>}
    </Container>

  );

}

export default LobbyPlayerList;
