import './titlebar.scss';
import {Container, Nav, Navbar} from "react-bootstrap";
import navbarLogo from '../../assets/images/logo.svg';
import {Link} from "../Router/Link.jsx";

const Titlebar = () => (
    <Navbar>
        <Container>
            <Navbar.Brand href="/">
                <img alt="logo" src={navbarLogo} width="50" height="50"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsibe-navbar-nav">
                <Nav>
                    <Link to="downloads">Downloads</Link>
                    <Link to="status">Status</Link>
                    <Link to="akashic-records">Akashic Records</Link>
                    <Link to="bbs">BBS</Link>
                    <Link to="discord">Discord</Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default Titlebar;