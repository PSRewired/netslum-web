'use client'

import { Button, Dropdown, Image, Spinner } from 'react-bootstrap';
import { FaDiscord } from 'react-icons/fa6';
import './discordLogin.scss'
import { signIn, signOut, useSession } from 'next-auth/react';
import NextImage from 'next/image';
import { forwardRef, useCallback } from 'react';

const ProfileAvatar = forwardRef(function Avatar({children, onClick }, ref) {
  const session = useSession();

  const {data: {user = undefined} = {}} = session;

  return (
    <a onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    <Image src={user.image} alt="profile-avatar" width={40} height={40} component={NextImage} className="rounded-circle"/>
  </a>
);
});

export default function DiscordLoginButton() {
  const session = useSession();

  const sessionLoading = session?.status === 'loading';

  const login = useCallback(async () => {
    await signIn('discord');
  }, [])

  if (session?.status === 'authenticated' && session?.data?.user !== undefined) {
    return (
      <Dropdown>
        <Dropdown.Toggle id="user-profile-actions" as={ProfileAvatar}/>
        <Dropdown.Menu flip={true} align='right'>
          <Dropdown.Item disabled>{session?.data?.user?.name}</Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item onClick={() => signOut()}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  if (sessionLoading) {
    return (
      <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" className="button-loading-spinner" />
    );
  }

  return (
      <Button className="d-flex align-items-center discord-button" variant="outline-secondary" size="sm">
        <FaDiscord size={32} className="discord-icon" onClick={login}/>
        Log In
      </Button>
  )
}