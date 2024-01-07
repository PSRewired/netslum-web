import { Nav } from 'react-bootstrap';
import NextLink from 'next/link';

export const Link = ({ href, children, ...other }) => (
  <Nav.Link as={NextLink} href={href} {...other}>
    {children}
  </Nav.Link>
);

export default Link;
