import axios from 'axios';

const httpClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NEXT_PUBLIC_API_URI,
});

export const getServerStats = () => httpClient.get(`/api/stats`);

export const getAllPlayers = (
  page = 1,
  pageSize = 10,
  characterName = undefined,
) =>
  httpClient.get(`/api/players`, {
    params: {
      page,
      pageSize,
      characterName,
    },
  });

export const getCharacter = (characterId) =>
  httpClient.get(`/api/players/${characterId}`);

export const getCharacterStatsHistory = (characterId) =>
  httpClient.get(`/api/players/${characterId}/stats`);

export const getAccountCharacters = (accountId) =>
  httpClient.get(`/api/players/account/${accountId}`);

export const getOnlineAreaServers = () => httpClient.get(`/api/areaservers`);
