import React, { useState, useEffect } from "react";
import axios from "axios";

const WordManager = () => {
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [newTranslation, setNewTranslation] = useState("");
    const [newArticle, setNewArticle] = useState("");
    const [error, setError] = useState("");

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/nouns`);
        setWords(response.data);
    };

    const addWord = async () => {
        if (!newWord || !newTranslation || !newArticle) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/nouns`, {
                word: newWord,
                translation: newTranslation,
                article: newArticle,
            });
            fetchWords();
            setNewWord("");
            setNewTranslation("");
            setNewArticle("");
            setError(""); // Очистить сообщение об ошибке
        } catch (err) {
            if (err.response && err.response.data) {
                // Отображаем сообщение об ошибке из поля "message"
                setError(err.response.data);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };



    const deleteWord = async (id) => {
        await axios.delete(`${API_BASE_URL}/api/nouns/${id}`);
        fetchWords();
    };

    return (
        <div>
            <h2>Liste verwalten</h2>
            <div>
                <input
                    type="text"
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                    placeholder="Article (der/die/das)"
                />
                <input
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Word"
                />
                <input
                    type="text"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="Translation"
                />
                <button onClick={addWord}>Add Word</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Article</th>
                    <th>Word</th>
                    <th>Translation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {words.map((word) => (
                    <tr key={word.id}>
                        <td>{word.id}</td>
                        <td>{word.article}</td>
                        <td>{word.word}</td>
                        <td>{word.translation}</td>
                        <td>
                            <button onClick={() => deleteWord(word.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordManager;
