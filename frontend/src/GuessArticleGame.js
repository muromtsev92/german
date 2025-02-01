import React, { useState } from "react";
import "./Game.css";

const GuessArticleGame = () => {
    const [settingsVisible, setSettingsVisible] = useState(true);
    const [gameActive, setGameActive] = useState(false);
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalWords, setTotalWords] = useState(10);
    const [feedback, setFeedback] = useState("");
    const [incorrectWords, setIncorrectWords] = useState([]);
    const [suddenDeathMode, setSuddenDeathMode] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const startGame = async (isSuddenDeath = false) => {
        try {
            const wordCount = isSuddenDeath ? 100 : totalWords;
            const response = await fetch(`${API_BASE_URL}/api/nouns/random?size=${wordCount}`);
            const data = await response.json();

            // УБИРАЕМ data.content, так как API сразу возвращает массив
            if (Array.isArray(data) && data.length > 0) {
                setWords(data); // Просто сохраняем массив слов
                setSettingsVisible(false);
                setGameActive(true);
                setCurrentWordIndex(0);
                setCorrectCount(0);
                setFeedback("");
                setIncorrectWords([]);
                setGameOver(false);
                setSuddenDeathMode(isSuddenDeath);
            } else {
                setFeedback("Не удалось загрузить слова. Попробуйте снова.");
            }
        } catch (error) {
            console.error("Error fetching words:", error);
            setFeedback("Ошибка загрузки данных.");
        }
    };

    const checkArticle = (selectedArticle) => {
        const currentWord = words[currentWordIndex];

        if (currentWord.article === selectedArticle) {
            setCorrectCount((prev) => prev + 1);
            setFeedback(`✅ Правильно: ${selectedArticle} ${currentWord.word}`);
        } else {
            setFeedback(`❌ Неправильно: ${currentWord.article} ${currentWord.word}`);
            setIncorrectWords((prev) => [...prev, currentWord]);

            if (suddenDeathMode) {
                setGameActive(false);
                setGameOver(true);
                return;
            }
        }

        // Переход к следующему слову
        if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex((prev) => prev + 1);
        } else {
            setGameActive(false);
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setSettingsVisible(true);
        setGameActive(false);
        setWords([]);
        setCorrectCount(0);
        setTotalWords(10);
        setFeedback("");
        setIncorrectWords([]);
        setSuddenDeathMode(false);
        setGameOver(false);
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
                        disabled={suddenDeathMode}
                    />
                </label>
                <button className="button" onClick={() => startGame(false)}>
                    Начать
                </button>
                <button
                    className="button sudden-death"
                    onClick={() => startGame(true)}
                >
                    Режим до первой ошибки
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
                {feedback && <p className="feedback">{feedback}</p>}
                <p>
                    Пройдено: {currentWordIndex + 1} / {words.length}. Угадано: {correctCount}.
                </p>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="container">
                <h2 className="header">Игра завершена!</h2>

                {suddenDeathMode ? (
                    <p>Вы угадали {correctCount} слов подряд до первой ошибки!</p>
                ) : (
                    <p>Угадано: {correctCount} из {words.length} слов.</p>
                )}

                {incorrectWords.length > 0 && (
                    <>
                        <h3>Неправильные слова:</h3>
                        <ul className="list-no-indent">
                            {incorrectWords.map((word, index) => (
                                <li key={index}>
                                    {word.word} - правильный артикль: <strong>{word.article}</strong>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button className="button" onClick={resetGame}>
                    Играть снова
                </button>
            </div>
        );
    }

    return null;
};

export default GuessArticleGame;
