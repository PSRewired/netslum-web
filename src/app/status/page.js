import AreaServerList from '../../components/AreaServer/AreaServerList.js';
import { Container, Row } from 'react-bootstrap';
import LobbyPlayerList from '../../components/Lobbies/LobbyPlayerList.js';

export const metadata = {
  title: 'Server Status',
};

const StatusPage = () => {
  return (
    <Container>
      <Row className="mb-3">
        <AreaServerList />
      </Row>
      <Row className="row-gap-3">
        <LobbyPlayerList />
      </Row>
    </Container>
  );
};

export default StatusPage;
