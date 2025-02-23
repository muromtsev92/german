import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/WordManager.css";

const VerbManager = () => {
    const [verbs, setVerbs] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [newTranslation, setNewTranslation] = useState("");
    const [newPrateritum, setNewPrateritum] = useState("");
    const [newPartizipZwei, setNewPartizipZwei] = useState("");
    const [error, setError] = useState("");

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchVerbs();
    }, []);

    const fetchVerbs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/verbs`);
            setVerbs(response.data);
        } catch (error) {
            console.error("Error fetching verbs:", error);
        }
    };

    const addVerb = async () => {
        if (!newWord || !newTranslation || !newPrateritum || !newPartizipZwei) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/verbs`, {
                word: newWord,
                translation: newTranslation,
                prateritum: newPrateritum,
                partizipZwei: newPartizipZwei,
            });
            fetchVerbs();
            setNewWord("");
            setNewTranslation("");
            setNewPrateritum("");
            setNewPartizipZwei("");
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Error adding verb");
        }
    };

    const deleteVerb = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/verbs/${id}`);
            fetchVerbs();
        } catch (err) {
            console.error("Error deleting verb:", err);
        }
    };

    return (
        <div className="container">
            <h2 className="header">Verben verwalten</h2>
            {/* Форма для добавления нового глагола */}
            <div className="form">
                <input
                    className="input"
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Verb"
                />
                <input
                    className="input"
                    type="text"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="Translation"
                />
                <input
                    className="input"
                    type="text"
                    value={newPrateritum}
                    onChange={(e) => setNewPrateritum(e.target.value)}
                    placeholder="Präteritum"
                />
                <input
                    className="input"
                    type="text"
                    value={newPartizipZwei}
                    onChange={(e) => setNewPartizipZwei(e.target.value)}
                    placeholder="Partizip II"
                />
                <button className="button add-button" onClick={addVerb}>
                    Add Verb
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}

            {/* Таблица с глаголами */}
            <div className="tableContainer">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Verb</th>
                        <th>Translation</th>
                        <th>Präteritum</th>
                        <th>Partizip II</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {verbs.map((verb) => (
                        <tr key={verb.id}>
                            <td>{verb.id}</td>
                            <td>{verb.word}</td>
                            <td>{verb.translation}</td>
                            <td>{verb.prateritum}</td>
                            <td>{verb.partizipZwei}</td>
                            <td>
                                <button
                                    className="button delete-button"
                                    onClick={() => deleteVerb(verb.id)}
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

export default VerbManager;
