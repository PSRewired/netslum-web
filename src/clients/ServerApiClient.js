import axios from 'axios';

export class ServerApiClient {
  #client;

  constructor(baseURL = null) {
    this.#client = axios.create({
      baseURL,
      withCredentials: true,
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

  getOnlinePlayers = () => this.#client.get(`/api/players/online`);

  getCharacter = (characterId) =>
    this.#client.get(`/api/players/${characterId}`);

  getCharacterStatsHistory = (characterId) =>
    this.#client.get(`/api/players/${characterId}/stats`);

  getAccountCharacters = (accountId) =>
    this.#client.get(`/api/players/account/${accountId}`);

  getOnlineAreaServers = () => this.#client.get(`/api/areaservers`);

  getAllLobbies = () => this.#client.get(`/api/lobbies`);

  getHealthCheck = () => this.#client.get(`/api/health`);

  getNewsArticles = () => this.#client.get(`/api/news`);
  createNewsArticle = (values) => this.#client.post(`/api/news`, values);

  getNewsArticle = (articleId) => this.#client.get(`/api/news/${articleId}`);

  getUserProfile = () => this.#client.get(`/api/users/profile`);
  getAuthRoles = () => this.#client.get(`/api/users/roles`);
  getAuthUsers = (name = undefined) =>
    this.#client.get(`/api/users`, { params: { name } });
  updateAuthUser = (userId, values) =>
    this.#client.patch(`/api/users/${userId}`, values);

  createAreaServerClaimCode = () =>
    this.#client.post(`/api/areaservers/associations`);
  getAreaServerClaimCodeStatus = (code) =>
    this.#client.get(`/api/areaservers/associations`, { params: { code } });
  getUserAreaServerAssociations = () => this.#client.get(`/api/users/areaservers`);
  removeAreaServerAssociation = (associationId) => this.#client.delete(`/api/users/areaservers/${associationId}`, {associationId});
}
