import PlayerList from '../../../../components/Players/PlayerList.jsx';
import { Container, Row } from 'react-bootstrap';
import { SsrServerApiClient } from '../../../../util/SsrServerApiClient.js';

const AccountPlayersPage = async ({ params: { accountId } }) => {
  let players = [];

  try {
    players = (await SsrServerApiClient.getAccountCharacters(accountId))?.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <Container>
      <Row>
        <h4>Players belonging to this account:</h4>
        <PlayerList players={players} />
      </Row>
    </Container>
  );
};

export default AccountPlayersPage;
