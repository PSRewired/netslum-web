'use client';

import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import CharacterCard from '@/components/Cards/CharacterCard.jsx';
import LoadingSpinner from '@/components/Util/LoadingSpinner.jsx';
import { MdPeople } from 'react-icons/md';
import StatsHistoryTable from './StatsHistoryTable.jsx';
import { useServerApi } from '@/hooks/useServerApi.js';

const ViewCharacter = ({ characterId }) => {
  const serverApiClient = useServerApi();
  const {
    data: characterInfo,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['character-info', characterId],
    queryFn: async () =>
      (await serverApiClient.getCharacter(characterId))?.data,
    retry: false,
  });

  const { data: characterHistory } = useQuery({
    queryKey: ['character-history', characterId],
    queryFn: async () =>
      (await serverApiClient.getCharacterStatsHistory(characterId))?.data,
    retry: false,
  });

  if (isFetching) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%' }}
      >
        <Row>
          <LoadingSpinner />
        </Row>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%' }}
      >
        <Row>
          <Col xs={12} className="text-center">
            <h5>The requested character does not exist.</h5>
          </Col>
          <Col className="text-center">
            <Button
              variant="outline-light"
              style={{ width: 150 }}
              href="/akashic-records"
            >
              Go Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-between">
        <Col lg={4}>
          <CharacterCard character={characterInfo} />
        </Col>
        <Col sm={1}>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="other-character-tooltip">
                View Other Characters
              </Tooltip>
            }
          >
            <Button
              variant="info"
              size="sm"
              color="white"
              className="view-characters-btn"
              style={{ float: 'right', color: 'white' }}
              href={`/akashic-records/account/${characterInfo.accountId}`}
            >
              <MdPeople size={24} />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row className="mt-3">
        <h4>Character Timeline:</h4>
        <StatsHistoryTable history={characterHistory} />
      </Row>
    </Container>
  );
};

export default ViewCharacter;
