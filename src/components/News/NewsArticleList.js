'use client';

import { useQuery } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import { Container, ListGroup } from 'react-bootstrap';
import { DateTime } from 'luxon';
import Link from '@/components/Router/Link';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';

export default function NewsArticleList({ expanded = false }) {
  const apiClient = useServerApi();

  const { data: articles = [], isFetching } = useQuery({
    queryKey: ['news-articles'],
    queryFn: async () => (await apiClient.getNewsArticles())?.data,
  });

  return (
    <ListGroup>
      {isFetching && (
        <Container className="d-flex justify-content-center">
          <LoadingSpinner />
        </Container>
      )}
      {articles.map((article) => (
        <ListGroup.Item key={article.id} as={Link} href={`/news/${article.id}`}>
          <Container className="d-flex justify-content-center">
            <div className="me-auto">
              <div className="fw-bold">{article.title}</div>
            </div>
            <small className="align-self-center">
              {DateTime.fromISO(article.createdAt, {
                zone: 'utc',
              }).toLocaleString(DateTime.DATETIME_MED)}
            </small>
          </Container>
          {expanded && (
            <Container className="d-flex mt-2 pb-0">
              <code>{article.content}</code>
            </Container>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
