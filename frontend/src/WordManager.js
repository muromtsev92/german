import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WordManager.css";

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
        try {
            const response = await axios.get(`${API_BASE_URL}/api/nouns`);
            setWords(response.data);
        } catch (err) {
            console.error("Error fetching words:", err);
        }
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
            setError("");
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Error adding word");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const deleteWord = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/nouns/${id}`);
            fetchWords();
        } catch (err) {
            console.error("Error deleting word:", err);
        }
    };

    return (
        <div className="container">
            <h2 className="header">Liste verwalten</h2>
            <div className="form">
                <input
                    className="input"
                    type="text"
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                    placeholder="Article (der/die/das)"
                />
                <input
                    className="input"
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Word"
                />
                <input
                    className="input"
                    type="text"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="Translation"
                />
                <button className="button" onClick={addWord}>Add Word</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="tableContainer">
                <table className="table">
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
                                <button
                                    className="button"
                                    style={{backgroundColor: "#dc3545"}}
                                    onClick={() => deleteWord(word.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WordManager;
