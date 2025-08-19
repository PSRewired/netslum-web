import { Container } from 'react-bootstrap';
import Image from 'next/image';
import './newsArticle.scss';

export function NewsArticle({article}) {

  return (
    <Container className="fragment-list position-relative d-flex flex-column ">
      <div className="position-relative header">
        <Image
          alt="logo"
          src="/images/hud/titlebar.png"
          width="350"
          height="24"
        />
        <p className="header-text">{article.title}</p>
      </div>
      <p>{article.content}</p>
    </Container>
  );
}