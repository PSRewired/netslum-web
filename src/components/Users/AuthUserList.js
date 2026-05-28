'use client';

import { useAuthUserProfile } from '@/contexts/AuthUserProfileContext.js';
import { useQuery } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import {
  Button,
  Col,
  Container,
  InputGroup,
  Row,
  Form,
  Table,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { MdClear, MdSearch } from 'react-icons/md';
import { useCallback, useState } from 'react';
import Link from '@/components/Router/Link.jsx';
import { CharacterClassNames } from '@/constants/Character.js';
import { DateTime } from 'luxon';
import { find } from 'lodash/collection';
import AssignRoleModal from './AssignRoleModal.js';

export default function AuthUserList() {
  const apiClient = useServerApi();

  const [searchTerm, setSearchTerm] = useState('');

  const clearSearch = useCallback(() => setSearchTerm(''), []);

  const { data: users = { results: [] }, isLoading } = useQuery({
    queryKey: ['auth-users', searchTerm],
    queryFn: async () =>
      (await apiClient.getAuthUsers(searchTerm || undefined))?.data,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['auth-roles'],
    queryFn: async () => (await apiClient.getAuthRoles())?.data,
  });

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col xs={12}>
          <h2 className="underline-secondary">Manage Users</h2>
        </Col>
        <Col xs={12} md={6}>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={(values) => setSearchTerm(values.name)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    id="search-users"
                    name="name"
                    type="text"
                    placeholder="Username"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      clearSearch();
                      resetForm();
                    }}
                  >
                    <MdClear />
                  </Button>
                  <Button type="submit">
                    <MdSearch />
                  </Button>
                </InputGroup>
              </form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row className="mt-3">
        <AuthUserTable users={users.data} roles={roles} />
      </Row>
    </Container>
  );
}
function AuthUserTable({ users = [], roles = [] }) {
  const getUserRole = useCallback(
    (user) => {
      const associatedRole = find(roles, { id: user.roleId });

      if (!associatedRole) {
        return '-';
      }

      return associatedRole.roleName;
    },
    [roles],
  );
  return (
    <Container
      fluid
      className="px-0"
      style={{
        backgroundColor: 'var(--bs-body-bg)',
      }}
    >
      <Row className="g-0 py-2 border-bottom fw-bold bg-secondary bg-opacity-10">
        <Col xs={6} className="ps-2">
          Username
        </Col>
        <Col xs={3} className="px-2">
          Role
        </Col>
        <Col xs={3} className="pe-2">
          Created At
        </Col>
      </Row>

      {users.map((p, i) => (
        <Row key={i} className="g-0 py-2 border-bottom align-items-center">
          <Col xs={6} className="ps-2 text-break">
            {p.username}
          </Col>
          <Col xs={3} className="px-2 text-nowrap">
            {getUserRole(p)}
            <AssignRoleModal user={p} roles={roles} />
          </Col>
          <Col xs={3} className="pe-2 text-nowrap">
            {DateTime.fromISO(p.createdAt, { zone: 'utc' }).toLocaleString(
              DateTime.DATETIME_MED,
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
}
