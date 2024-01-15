import axios from 'axios';

export class ServerApiClient {
  #client;

  constructor(baseURL = null) {
    this.#client = axios.create({
      baseURL,
    });
  }

  getServerStats = () => this.#client.get(`/api/stats`);

  getAllPlayers = (page = 1, pageSize = 10, characterName = undefined) =>
    this.#client.get(`/api/players`, {
      params: {
        page,
        pageSize,
        characterName,
      },
    });

  getCharacter = (characterId) =>
    this.#client.get(`/api/players/${characterId}`);

  getCharacterStatsHistory = (characterId) =>
    this.#client.get(`/api/players/${characterId}/stats`);

  getAccountCharacters = (accountId) =>
    this.#client.get(`/api/players/account/${accountId}`);

  getOnlineAreaServers = () => this.#client.get(`/api/areaservers`);

  getAllLobbies = () => this.#client.get(`/api/lobbies`);
}
