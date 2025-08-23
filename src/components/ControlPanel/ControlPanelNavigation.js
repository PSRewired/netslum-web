'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MdExpandMore, MdNavigateNext } from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';
import { FaGear } from 'react-icons/fa6';
import { canAccessRoute } from '@/rbac.config';
import { useAuthUserProfile } from '@/contexts/AuthUserProfileContext.js';
import { SlGraph } from 'react-icons/sl';
import {
  Accordion,
  AccordionBody,
  Container,
  ListGroup,
  Offcanvas,
} from 'react-bootstrap';
import './controlPanelNavigation.scss';
import NextLink from 'next/link';
import { IoMdMegaphone } from 'react-icons/io';

const navItems = [
  {
    title: 'News',
    to: '/control-panel/news',
    icon: <BsNewspaper />,
  },
  {
    title: 'MOTD',
    to: '/control-panel/motd',
    icon: <IoMdMegaphone />,
  },
];

const ControlPanelNavigation = () => {
  const pathname = usePathname();
  const { permissions } = useAuthUserProfile();

  const checkRoles = (path) => canAccessRoute(path, permissions);

  return (
    <div className="cp-drawer">
      <ListGroup className="cp-navlist">
        {permissions &&
          navItems.map((item, idx) => (
            <NavigationListItem
              key={idx}
              item={item}
              currentPath={pathname}
              checkRoles={checkRoles}
            />
          ))}
      </ListGroup>
    </div>
  );
};

function NavItemIcon({ children }) {
  return children;
}

function NavListItem({ to, component, onClick, selected, dense, children }) {
  return (
    <ListGroup.Item
      as={component}
      href={to}
      onClick={onClick}
      active={selected}
      className={dense ? 'cp-list-item-dense' : undefined}
    >
      {children}
    </ListGroup.Item>
  );
}

const NavigationListItem = ({ item, subItem, currentPath, checkRoles }) => {
  const singleObject = !item.children;

  if (!checkRoles(item.to)) {
    return null;
  }

  const selected =
    typeof item.pattern?.test === 'function'
      ? item.pattern.test(currentPath)
      : item.to === currentPath;

  if (singleObject) {
    return (
      <NavListItem
        selected={selected}
        component={!item.to ? null : NextLink}
        to={item.to}
        dense={subItem}
        {...item.props}
      >
        <Container className="d-flex ps-0 align-items-center">
          <NavItemIcon selected={selected}>{item.icon}</NavItemIcon>
          <h6 style={{ paddingLeft: 8, marginBottom: 0 }}>{item.title}</h6>
        </Container>
      </NavListItem>
    );
  }

  // Do not render the category if no children exist, or the user does not have access to any of its items
  const hasNoAvailableOptions = !item.children.filter((c) => checkRoles(c.to))
    .length;

  if (hasNoAvailableOptions) {
    return null;
  }

  return (
    <Accordion
      onClick={() => setOpen((o) => !o)}
      flush
      className="cp-subsection"
    >
      <Accordion.Header>
        <NavItemIcon selected={selected}>{item.icon}</NavItemIcon>
        <h6 style={{ paddingLeft: 8, marginBottom: 0 }}>{item.title}</h6>
      </Accordion.Header>
      <Accordion.Body style={{ padding: 0 }}>
        <ListGroup>
          {item.children.map((child, idx) => (
            <NavigationListItem
              key={idx}
              item={child}
              subItem
              currentPath={currentPath}
              checkRoles={checkRoles}
            />
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion>
  );
};

export default ControlPanelNavigation;
