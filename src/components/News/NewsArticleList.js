'use client';

import { useQuery } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import { Container, ListGroup } from 'react-bootstrap';
import { DateTime } from 'luxon';
import Link from '@/components/Router/Link';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';

export default function NewsArticleList() {
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
          <Container className="d-flex justify-content-between">
            <span>{article.title}</span>
            <span>
              {DateTime.fromISO(article.createdAt, {
                zone: 'utc',
              }).toLocaleString(DateTime.DATETIME_MED)}
            </span>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
