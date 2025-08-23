import { Container } from 'react-bootstrap';
import NotFound from '@/components/App/NotFound.jsx';
import { ServerApiClient } from '@/clients/ServerApiClient.js';
import { getServerHost } from '@/util/HostUtils.js';
import { NewsArticle } from '@/components/News/NewsArticle.js';

async function getArticle(articleId) {
  const host = await getServerHost();
  const client = new ServerApiClient(host);

  return (await client.getNewsArticle(articleId))?.data;
}

export default async function NewsArticlePage({ params }) {
  const { articleId } = await params;

  const article = await getArticle(articleId);

  if (!article) {
    return <NotFound />;
  }

  return (
    <Container className="gap-3 d-flex flex-column">
      <NewsArticle article={article} />
    </Container>
  );
}
