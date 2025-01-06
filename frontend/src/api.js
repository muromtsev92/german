import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/words';

export const getAllWords = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addWord = async (word, translation) => {
    const response = await axios.post(API_BASE_URL, { word, translation });
    return response.data;
};

export const deleteWord = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};
