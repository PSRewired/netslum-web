import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
});

export const getServerStats = () => httpClient.get(`/api/stats`);

export const getAllPlayers = (page = 1, pageSize = 10, characterName = undefined) => httpClient.get(`/api/players`, {
    params: {
        page,
        pageSize,
        characterName
    }
});

export const getCharacter = (characterId) => httpClient.get(`/api/players/${characterId}`);
