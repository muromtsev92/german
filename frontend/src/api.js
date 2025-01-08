import axios from "axios";

// Базовый URL берётся из переменных окружения
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getRandomNoun = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/nouns/game/random`);
    return response.data;
};

export const checkTranslation = async (word, translation) => {
    const response = await axios.post(`${API_BASE_URL}/api/nouns/game/check`, {
        word,
        translation
    });
    return response.data;
};

