import NewsArticleList from '@/components/News/NewsArticleList.js';
import { Col, Container, Row } from 'react-bootstrap';
import CreateNewsArticleModal from '@/components/News/CreateNewsArticleModal.js';

export const metadata = {
  title: 'News Management',
};

export default async function ControlPanelNewsPage() {
  return (
    <Container className="gap-3 d-flex flex-column">
      <Container fluid className="d-flex justify-content-end">
        <Row>
          <Col>
            <CreateNewsArticleModal />
          </Col>
        </Row>
      </Container>
      <NewsArticleList expanded={true} />
    </Container>
  );
}
