'use client';

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { MdClear, MdSearch } from 'react-icons/md';
import {
  getAllPlayers,
  getServerStats,
} from '../../clients/ServerApiClient.js';
import LoadingSpinner from '../Util/LoadingSpinner.jsx';
import { Link } from '../Router/Link.jsx';
import { Formik } from 'formik';
import { useState } from 'react';
import { CharacterClassNames } from '../../constants/Character.js';
import { useQuery } from '@tanstack/react-query';
import PlayerList from './PlayerList.jsx';

const StatsPanel = ({ name, value }) => (
  <Col xs={12} md={4}>
    <Card>
      <Card.Body className="d-flex justify-content-between">
        <span>{name}</span>
        <Badge pill bg="primary">
          {value}
        </Badge>
      </Card.Body>
    </Card>
  </Col>
);

const SearchCharacters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { data: serverStats = {}, isFetching: isLoadingStats } = useQuery({
    queryKey: ['server-stats'],
    queryFn: async () => (await getServerStats())?.data,
  });

  const { data: allPlayers = [] } = useQuery({
    queryKey: ['all-players', currentPage, searchValue],
    queryFn: async () =>
      (await getAllPlayers(currentPage, 10, searchValue))?.data,
  });

  const onSearchChanged = ({ name }) => {
    console.log('search changed');
    setSearchValue(name);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchValue('');
    setCurrentPage(1);
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="underline-primary">Akashic Records</h1>
        </Col>
        <Col xs={12} as="p">
          The Akashic Records are a live database of player and character
          information. Any time a character logs into the Netslum server it is
          logged to the Akashic Records, along with information about that login
          such as Class, Level, Treasures gained and more.
        </Col>
        <Col xs={12} as="p">
          To use the records, simply type the name of the Character you wish to
          search for into the search box above. From there, you can view any
          characters matching the search terms. Once on the page for a
          character, you can also view the names of any other characters that
          are owned by the same player.
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2 className="underline-secondary">Statistics</h2>
        </Col>
        <LoadingSpinner loading={isLoadingStats} />
        {!isLoadingStats && (
          <>
            <StatsPanel
              name="Registered Characters"
              value={serverStats?.registeredCharacters || '?'}
            />
            <StatsPanel
              name="Total Save Files Recorded"
              value={serverStats?.registeredAccounts || '?'}
            />
          </>
        )}
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <h2 className="underline-secondary">Find a character</h2>
        </Col>
        <Col xs={12} md={6}>
          <Formik initialValues={{ name: '' }} onSubmit={onSearchChanged}>
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
                    id="search-character"
                    name="name"
                    type="text"
                    placeholder="Character Name"
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
        <PlayerList players={allPlayers?.data} />
      </Row>
    </Container>
  );
};

export default SearchCharacters;
