'use client';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100%' }}
    >
      <Row>
        <Col xs={12} className="text-center">
          <h1>404</h1>
        </Col>
        <Col className="text-center">
          <Button
            variant="outline-light"
            style={{ width: 150 }}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
