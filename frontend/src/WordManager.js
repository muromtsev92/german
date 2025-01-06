import React, { useState, useEffect } from 'react';
import { getAllWords, addWord, deleteWord } from './api';

const WordManager = () => {
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [newTranslation, setNewTranslation] = useState('');

    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        const data = await getAllWords();
        setWords(data);
    };

    const handleAddWord = async () => {
        if (newWord && newTranslation) {
            await addWord(newWord, newTranslation);
            setNewWord('');
            setNewTranslation('');
            loadWords();
        }
    };

    const handleDeleteWord = async (id) => {
        await deleteWord(id);
        loadWords();
    };

    return (
        <div>
            <h1>Word Manager</h1>
            <div>
                <input
                    type="text"
                    placeholder="Word"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Translation"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                />
                <button onClick={handleAddWord}>Add Word</button>
            </div>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Word</th>
                    <th>Translation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {words.map((word) => (
                    <tr key={word.id}>
                        <td>{word.id}</td>
                        <td>{word.word}</td>
                        <td>{word.translation}</td>
                        <td>
                            <button onClick={() => handleDeleteWord(word.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordManager;
