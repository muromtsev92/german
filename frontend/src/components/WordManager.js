import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/WordManager.css";

const WordManager = () => {
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [newTranslation, setNewTranslation] = useState("");
    const [newArticle, setNewArticle] = useState("");
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // Текущая страница
    const [pageSize, setPageSize] = useState(30); // Количество слов на страницу
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async (page = 0, size = 30) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/nouns/paged`, {
                params: { page, size },
            });
            setWords(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching paged words:", error);
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

    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSize(newSize);
        fetchWords(0, newSize); // Загружаем первую страницу с новым размером
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchWords(newPage, pageSize);
        }
    };

    //TODO пагинация по алфавиту

    return (
        <div className="container">
            <h2 className="header">Liste verwalten</h2>
            {/* Форма для добавления нового слова */}
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
                <button className="button add-button" onClick={addWord}>
                    Add Word
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}

            <div className="pagination-controls">
                <label>
                    Words per page:
                    <select
                        className="select"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={100}>100</option>
                    </select>
                </label>
            </div>

            {/* Таблица с данными */}
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
                                    className="button delete-button"
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

            {/* Пагинация */}
            <div className="pagination-controls">
                <button
                    className="button pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Prev
                </button>
                <span>
                Page {currentPage + 1} of {totalPages}
            </span>
                <button
                    className="button pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );

};

export default WordManager;
