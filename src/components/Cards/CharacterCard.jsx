'use client';

import { Badge, Col, Container, Row } from 'react-bootstrap';

import './characterCard.scss';
import FragmentTextBox from './FragmentTextBox.jsx';

const CharacterCard = ({
  character,
  showStats = true,
  showGreeting = true,
}) => {
  return (
    <Container className="character-container">
      <Row>
        <Col className="stats-container" xs={7}>
          <img
            src={`/images/portraits/${character?.avatarId?.toLowerCase()}.png`}
            alt="portrait"
            className="avatar"
          />
          <img
            src="/images/hud/stats.png"
            alt="stats-container"
            className="stats-hud"
          />
          <span className="character-name hack-font fw-bolder">
            {character?.characterName}
          </span>
          <span className="hp-amount hack-font">{character?.currentHp}</span>
          <span className="sp-amount hack-font">{character?.currentSp}</span>
        </Col>
        {showStats && (
          <Col xs={5}>
            <ul className="list-unstyled char-stats-block">
              <li>
                <Badge>GP: {character.currentGp}</Badge>
              </li>
              <li>
                <Badge>Online Treasures: {character?.onlineTreasures}</Badge>
              </li>
              <li>
                <Badge>Avg Field Level: {character?.averageFieldLevel}</Badge>
              </li>
            </ul>
          </Col>
        )}
      </Row>
      {showGreeting && (
        <Row style={{ marginTop: 6 }}>
          <FragmentTextBox>
            <span>{character?.greeting}</span>
          </FragmentTextBox>
        </Row>
      )}
    </Container>
  );
};

export default CharacterCard;
