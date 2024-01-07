import ViewCharacter from '../../../components/Players/ViewCharacter.jsx';
import { getCharacter } from '../../../clients/ServerApiClient.js';

export async function generateMetadata({ params }) {
  try {
    const { data: character } = await getCharacter(params.characterId);
    console.log(character);

    return {
      title: `Character Record: ${character.characterName}`,
      openGraph: {
        images: `/images/portraits/${character?.avatarId?.toLowerCase()}.png`,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    title: 'Invalid character',
  };
}

const CharacterRecord = ({ params: { characterId } }) => {
  return <ViewCharacter characterId={characterId} />;
};

export default CharacterRecord;
