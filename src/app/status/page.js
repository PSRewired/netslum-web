import AreaServerList from '@/components/AreaServer/AreaServerList.js';
import { Container, Row } from 'react-bootstrap';
import LobbyPlayerList from '@/components/Lobbies/LobbyPlayerList.js';

export const metadata = {
  title: 'Server Status',
};

export default async function StatusPage() {
  return (
    <Container>
      <Row className="mb-3">
      <h1 className="underlined underline-primary">
        Server Status&nbsp;
        <small className="text-muted">サーバ</small>
      </h1>
      </Row>
      <Row className="mb-3">
        <AreaServerList />
      </Row>
      <Row className="row-gap-3">
        <LobbyPlayerList />
      </Row>
    </Container>
  );
}
