'use server';

import ViewCharacter from '@/components/Players/ViewCharacter.jsx';
import { getServerHost } from '@/util/HostUtils.js';
import { ServerApiClient } from '@/clients/ServerApiClient.js';

export async function generateMetadata({ params }) {
  try {
    const host = getServerHost();
    const apiClient = new ServerApiClient(host);
    const { data: character } = await apiClient.getCharacter(
      params.characterId,
    );

    return {
      title: `Character Record: ${character.characterName}`,
      openGraph: {
        images: `/images/portraits/${character?.avatarId?.toLowerCase()}.png`,
        description: character?.greeting ?? '',
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    title: 'Invalid character',
  };
}

export default async function CharacterRecord({ params: { characterId } }) {
  return <ViewCharacter characterId={characterId} />;
}
