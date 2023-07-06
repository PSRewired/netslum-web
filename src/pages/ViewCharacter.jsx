import {useParams} from "react-router-dom";
import {getCharacter} from "../clients/ServerApiClient.js";
import {Col, Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import CharacterCard from "../components/Cards/CharacterCard.jsx";

const ViewCharacter = () => {
    const {id: characterId} = useParams();

    const {data: characterInfo} = useQuery(['character-info', characterId], async () => (await getCharacter(characterId))?.data);

    return (
        <Container>
            {JSON.stringify(characterInfo)}
            <Row>
                <Col xs={12} md={6}>
                    <CharacterCard character={characterInfo}/>
                </Col>
            </Row>
        </Container>
    )

};

export default ViewCharacter;