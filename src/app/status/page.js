import AreaServerList from '../../components/AreaServer/AreaServerList.js';
import { Container, Row } from 'react-bootstrap';

export const metadata = {
  title: 'Server Status',
};

const StatusPage = () => {
  return (
    <Container>
      <Row>
        <h2 className="underline-primary">Online Area Servers</h2>
        <AreaServerList />
      </Row>
    </Container>
  );
};

export default StatusPage;
