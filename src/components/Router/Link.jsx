import {Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

export const Link = ({to, children, LinkProps={}, ...other}) =>
    <LinkContainer to={to} {...other}>
        <Nav.Link {...LinkProps}>{children}</Nav.Link>
    </LinkContainer>;