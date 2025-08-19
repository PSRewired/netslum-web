import { Container } from 'react-bootstrap';
import NewsArticleList from '@/components/News/NewsArticleList.js';

export default async function NewsPage() {
  return (
    <Container className="gap-3 d-flex flex-column">
      <h1 className="underline-primary">Server News&nbsp;
        <small className="text-muted">サーバーニュース</small>
      </h1>
      <NewsArticleList />
    </Container>
  )
}