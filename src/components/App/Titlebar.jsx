'use client';

import './titlebar.scss';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from '@/components/Router/Link';
import Image from 'next/image';
import DiscordLoginButton from '@/components/Auth/DiscordLoginButton.js';

const Titlebar = () => (
  <Navbar expand="md">
    <Container fluid>
      <Navbar.Brand href="/" style={{ display: 'flex' }} as={Link}>
        <Image
          priority
          alt="logo"
          src="/images/logo.svg"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
        <span>Netslum</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Link href="/news">News</Link>
          <Link href="/downloads">Downloads</Link>
          <Link href="/status">Status</Link>
          <Link href="/akashic-records">Akashic Records</Link>
          <Link href="https://bbs.dothackers.org/">BBS</Link>
          <Link href="https://discord.gg/AMqgeFVzBw">Discord</Link>
        </Nav>
        <div className="d-flex flex-grow-1" />
        <DiscordLoginButton />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Titlebar;
