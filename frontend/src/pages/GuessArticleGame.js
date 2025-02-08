import React, { useState } from "react";
import "../assets/styles/Game.css";

const GuessArticleGame = () => {
    const [settingsVisible, setSettingsVisible] = useState(true);
    const [gameActive, setGameActive] = useState(false);
    const [currentWord, setCurrentWord] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalWords, setTotalWords] = useState(10);
    const [feedback, setFeedback] = useState("");
    const [incorrectWords, setIncorrectWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [suddenDeathMode, setSuddenDeathMode] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const fetchRandomWord = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/nouns/random`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить слово");
            }
            const word = await response.json();
            console.log("Загруженное слово:", word);

            // Проверяем, что структура ответа корректна
            if (word && word.word && word.article && word.translation) {
                return {
                    word: word.word,
                    article: word.article,
                    translation: word.translation,
                };
            } else {
                console.error("Ответ API некорректен:", word);
                return null;
            }
        } catch (error) {
            console.error("Ошибка при запросе случайного слова:", error);
            setFeedback("Ошибка загрузки данных. Попробуйте снова.");
            return null;
        }
    };

    const startGame = async (isSuddenDeath = false) => {
        setSettingsVisible(false);
        setGameActive(true);
        setCorrectCount(0);
        setFeedback("");
        setIncorrectWords([]);
        setGameOver(false);
        setSuddenDeathMode(isSuddenDeath);
        setCurrentWordIndex(0);

        const initialWord = await fetchRandomWord();
        if (initialWord) {
            setCurrentWord(initialWord);
        } else {
            console.error("Не удалось загрузить начальное слово.");
            setFeedback("Ошибка загрузки начального слова. Попробуйте снова.");
            setGameActive(false);
            setGameOver(true);
        }
    };

    const checkArticle = async (selectedArticle) => {
        if (!currentWord) return;

        if (currentWord.article === selectedArticle) {
            setCorrectCount((prev) => prev + 1);
            setFeedback(`✅ Правильно: ${selectedArticle} ${currentWord.word} - ${currentWord.translation}`);
        } else {
            setFeedback(`❌ Неправильно: ${currentWord.article} ${currentWord.word} - ${currentWord.translation}`);
            setIncorrectWords((prev) => [...prev, currentWord]);

            if (suddenDeathMode) {
                setGameActive(false);
                setGameOver(true);
                return;
            }
        }

        if (currentWordIndex + 1 < totalWords) {
            setCurrentWordIndex((prev) => prev + 1);
            const nextWord = await fetchRandomWord();
            if (nextWord) {
                setCurrentWord(nextWord);
            } else {
                console.error("Не удалось загрузить следующее слово.");
                setFeedback("Ошибка загрузки следующего слова. Попробуйте снова.");
                setGameActive(false);
                setGameOver(true);
            }
        } else {
            setGameActive(false);
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setSettingsVisible(true);
        setGameActive(false);
        setCurrentWord(null);
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
                    <span>Wörter: {totalWords}</span>
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
                    Starten
                </button>
                <button
                    className="button sudden-death"
                    onClick={() => startGame(true)}
                >
                    Modus bis zum ersten Fehler
                </button>
            </div>
        );
    }

    if (gameActive && currentWord) {
        return (
            <div className="container">
                <h2 className="header">Erraten Sie den Artikel</h2>
                <p className="questionWord">
                    <strong>{currentWord.word}</strong>
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
                    Bestanden: {currentWordIndex + 1} / {totalWords}. Угадано: {correctCount}.
                </p>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="container">
                <h2 className="header">Spiel beendet!</h2>

                {suddenDeathMode ? (
                    <p>Sie haben {correctCount} Wörter in einer Reihe vor dem ersten Fehler erraten!</p>
                ) : (
                    <p>Erraten: {correctCount} von {totalWords} Wörter.</p>
                )}

                {incorrectWords.length > 0 && (
                    <>
                        <h3>Falsche Worte:</h3>
                        <ul className="list-no-indent">
                            {incorrectWords.map((word, index) => (
                                <li key={index}>
                                    {word.word} - {word.translation} - richtig Artikel ist <strong>{word.article}</strong>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button className="button" onClick={resetGame}>
                    Spielen wieder
                </button>
            </div>
        );
    }

    return null;
};

export default GuessArticleGame;
