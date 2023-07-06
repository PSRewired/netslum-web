import {Card, Col, Container, Row} from "react-bootstrap";

import './characterCard.scss';
import FragmentTextBox from "./FragmentTextBox.jsx";

const CharacterCard = ({character}) => {
    return (
        <Container fluid>
            <Row>
                <Col className="stats-container" xs={6}>
                    <img src={`/images/portraits/${character?.avatarId?.toLowerCase()}.png`} alt="portrait" className="avatar"/>
                    <img src="/images/hud/stats.png" alt="stats-container" className="stats-hud"/>
                    <span className="character-name hack-font fw-bolder">{character?.characterName}</span>
                    <span className="hp-amount hack-font">{character?.currentHp}</span>
                    <span className="sp-amount hack-font">{character?.currentSp}</span>
                </Col>
                <Col xs={4}>
                    <ul className="list-unstyled">
                        <li>G: {character?.goldCoinCount}</li>
                        <li>S: {character?.silverCoinCount}</li>
                        <li>B: {character?.bronzeCoinCount}</li>
                    </ul>
                </Col>
            </Row>
            <Row style={{marginTop: 6}}>
                <FragmentTextBox>
                    <span>{character?.greeting}</span>
                </FragmentTextBox>
            </Row>
        </Container>
    );
};

export default CharacterCard;