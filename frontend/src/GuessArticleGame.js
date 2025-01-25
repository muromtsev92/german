import React, { useState } from "react";
import "./Game.css"; // Используем существующие стили

const GuessArticleGame = () => {
    const [settingsVisible, setSettingsVisible] = useState(true);
    const [gameActive, setGameActive] = useState(false);
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalWords, setTotalWords] = useState(10); // Значение по умолчанию для ползунка
    const [feedback, setFeedback] = useState("");

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const startGame = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/nouns/paged?size=${totalWords}`);
            const data = await response.json();
            setWords(data.content);
            setSettingsVisible(false);
            setGameActive(true);
            setCurrentWordIndex(0);
            setCorrectCount(0);
            setFeedback("");
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

    const checkArticle = async (selectedArticle) => {
        const currentWord = words[currentWordIndex];
        try {
            const response = await fetch(`${API_BASE_URL}/api/nouns/game/check`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    word: currentWord.word,
                    article: selectedArticle,
                }),
            });
            const isCorrect = await response.json();
            if (isCorrect) {
                setCorrectCount((prev) => prev + 1);
                setFeedback(`Правильно — ${selectedArticle} ${currentWord.word}`);
            } else {
                setFeedback(`Неправильно! Правильный артикль: <strong>${currentWord.article}</strong> ${currentWord.word}`);
            }
            if (currentWordIndex + 1 < words.length) {
                setCurrentWordIndex((prev) => prev + 1);
            } else {
                setGameActive(false);
            }
        } catch (error) {
            console.error("Error checking article:", error);
        }
    };

    const resetGame = () => {
        setSettingsVisible(true);
        setGameActive(false);
        setWords([]);
        setCorrectCount(0);
        setTotalWords(10); // Сбрасываем на значение по умолчанию
        setFeedback("");
    };

    if (settingsVisible) {
        return (
            <div className="container">
                <h2 className="header">Einstellungen des Spiels</h2>
                <label className="slider-label">
                    <span>Слов: {totalWords}</span>
                    <input
                        type="range"
                        min="5"
                        max="15"
                        value={totalWords}
                        onChange={(e) => setTotalWords(Number(e.target.value))}
                        className="slider"
                    />
                </label>
                <button className="button" onClick={startGame}>
                    Начать
                </button>
            </div>
        );
    }

    if (gameActive) {
        const currentWord = words[currentWordIndex];
        return (
            <div className="container">
                <h2 className="header">Erraten Sie den Artikel</h2>
                <p>
                    Слово: <strong>{currentWord.word}</strong>
                </p>
                <div className="buttons">
                    {["der", "die", "das"].map((article) => (
                        <button
                            key={article}
                            className="button"
                            onClick={() => checkArticle(article)}
                        >
                            {article}
                        </button>
                    ))}
                </div>
                {feedback && (
                    <p
                        className="feedback"
                        dangerouslySetInnerHTML={{ __html: feedback }}
                    ></p>
                )}
                <p>
                    Пройдено: {currentWordIndex + 1} / {words.length}. Угадано: {correctCount}.
                </p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="header">Игра завершена!</h2>
            <p>Угадано: {correctCount} из {words.length} слов.</p>
            <button className="button" onClick={resetGame}>
                Играть снова
            </button>
        </div>
    );
};

export default GuessArticleGame;
