import React, { useState, useEffect } from "react";
import axios from "axios";

const WordManager = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9f9f9',
            padding: '20px',
        },
        header: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '400px',
        },
        input: {
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '5px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        table: {
            width: '100%',
            maxWidth: '600px',
            marginTop: '20px',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center", // Центрирование текста
            padding: "10px",
        },
        tableCell: {
            padding: "10px",
            border: "1px solid #ccc",
            textAlign: "center", // Центрирование содержимого
        },
    };


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
        <div style={styles.container}>
            <h2>Liste verwalten</h2>
            <div style={styles.header}>
                <input
                    style={styles.input}
                    type="text"
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                    placeholder="Article (der/die/das)"
                />
                <input
                    style={styles.input}
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Word"
                />
                <input
                    style={styles.input}
                    type="text"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="Translation"
                />
                <button onClick={addWord}>Add Word</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={styles.table}>
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
