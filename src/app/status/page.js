import AreaServerList from '@/components/AreaServer/AreaServerList.js';
import { Container, Row } from 'react-bootstrap';
import LobbyPlayerList from '@/components/Lobbies/LobbyPlayerList.js';
import HealthCheck from '@/components/Util/HealthCheck.js';

export const metadata = {
  title: 'Server Status',
};

export default async function StatusPage() {
  return (
    <Container className="gap-3 d-flex flex-column">
      <Row className="mb-3">
      <h1 className="underlined underline-primary">
        Server Status&nbsp;
        <small className="text-muted me-3">サーバ</small>
        <HealthCheck />
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
