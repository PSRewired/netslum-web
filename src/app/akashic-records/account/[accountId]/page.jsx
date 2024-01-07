import { getAccountCharacters } from '../../../../clients/ServerApiClient.js';
import PlayerList from '../../../../components/Players/PlayerList.jsx';
import { Container, Row } from 'react-bootstrap';

const AccountPlayersPage = async ({ params: { accountId } }) => {
  let players = [];

  try {
    players = (await getAccountCharacters(accountId))?.data;
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
