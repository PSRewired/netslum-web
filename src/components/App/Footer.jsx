'use client';

import './footer.scss';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer>
    <Container
      fluid
      className="d-flex justify-content-center align-content-center text-center"
    >
      <Row xs={12}>
        <Col xs={12} as="p" className="lead">
          Over the years the following people have made contributions to either
          the software or important research that made Netslum&apos;s Lobby
          Server possible:
          <br />
          Coldbird, NCDyson, Mugi, 1UP, Bison, WarrantyVoider, Zackmon,
          formlesstree4, Alkalime, K3rber0s.
        </Col>
        <Col xs={12} as="h6" className="text-muted">
          .hack//, .hack//fragment, Area Server and all related assets and
          properties are property of CyberConnect2 Co., Ltd, All Rights
          Reserved.
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
