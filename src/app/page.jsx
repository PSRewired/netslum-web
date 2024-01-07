import { Button, Col, Container, Row } from 'react-bootstrap';

export const metadata = {
  title: 'Home // Netslum // .hack Private Servers',
};

const Home = () => {
  return (
    <Container>
      <Row className="p-5">
        <Col xl={7}>
          <h1>.hack//Fragment Netslum Server</h1>
          <small className="subtitle">
            &ldquo;Against the abominable Wave, together they fight.&rdquo;
          </small>
        </Col>
        <Col xl={5}>
          <h3>What is .hack//Fragment?</h3>
          <p>
            .hack//fragment is an &quot;online/offline&quot; RPG released
            exclusively in Japan for the PlayStation 2. In 2006 the online
            service was discontinued, but thanks to the magic of server
            emulation it&apos;s possible to play online once more!
          </p>
          <Button href="/downloads" variant="outline-primary">
            Tell me more!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
