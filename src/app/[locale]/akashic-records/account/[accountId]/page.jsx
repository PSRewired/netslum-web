'use server';

import PlayerList from '../../../../../components/Players/PlayerList.jsx';
import { Container, Row } from 'react-bootstrap';
import { getServerHost } from '../../../../../util/HostUtils.js';
import { ServerApiClient } from '../../../../../clients/ServerApiClient.js';

async function getServerSideProps(accountId) {
  const host = getServerHost();
  const apiClient = new ServerApiClient(host);

  const players = (await apiClient.getAccountCharacters(accountId))?.data;

  return {
    players,
  };
}

export default async function AccountPlayersPage({ params: { accountId } }) {
  const { players } = await getServerSideProps(accountId);

  return (
    <Container>
      <Row>
        <h4>Players belonging to this account:</h4>
        <PlayerList players={players} />
      </Row>
    </Container>
  );
}
