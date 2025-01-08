import React, { useState, useEffect } from "react";
import { getRandomNoun, checkTranslation } from "./api";

const Game = () => {
    const [word, setWord] = useState(null);
    const [userTranslation, setUserTranslation] = useState("");
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchRandomWord();
    }, []);

    const fetchRandomWord = async () => {
        try {
            const noun = await getRandomNoun();
            setWord(noun);
            setMessage("");
            setUserTranslation("");
        } catch (error) {
            console.error("Error fetching random noun:", error);
            setMessage("Error fetching word!");
        }
    };

    const handleCheckTranslation = async () => {
        try {
            if (!word) return;

            const isCorrect = await checkTranslation(word.word, userTranslation);

            if (isCorrect) {
                setMessage("Correct!");
                setScore(score + 1);
            } else {
                setMessage("Wrong! Try again.");
            }

            fetchRandomWord();
        } catch (error) {
            console.error("Error checking translation:", error);
            setMessage("Error checking translation!");
        }
    };

    return (
        <div>
            <h1>Translation Game</h1>
            <p>Score: {score}</p>
            {word && <h2>Translate: {word.word}</h2>}
            <input
                type="text"
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder="Enter translation"
            />
            <button onClick={handleCheckTranslation}>Check</button>
            <p>{message}</p>
        </div>
    );
};

export default Game;
