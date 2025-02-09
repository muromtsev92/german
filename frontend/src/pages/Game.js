import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../assets/styles/Game.css";

const Game = () => {
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [nextWord, setNextWord] = useState(null);
    const [userTranslation, setUserTranslation] = useState("");
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [maxWords, setMaxWords] = useState(5);
    const [direction, setDirection] = useState("de-ru");
    const [message, setMessage] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [isGameActive, setIsGameActive] = useState(true);

    const inputRef = useRef(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const fetchWords = useCallback(async () => {
        const response = await axios.get(`${API_BASE_URL}/api/nouns`);
        const shuffledWords = response.data.sort(() => Math.random() - 0.5);
        setWords(shuffledWords.slice(0, maxWords));
        setCurrentWord(shuffledWords[0]);
        setNextWord(shuffledWords[1] || null);
    }, [API_BASE_URL, maxWords]);

    const handleCheckTranslation = useCallback(() => {
        if (!currentWord) return;

        const correctTranslation =
            direction === "de-ru" ? currentWord.translation : `${currentWord.article} ${currentWord.word}`;

        if (userTranslation.trim().toLowerCase() === correctTranslation.toLowerCase()) {
            setMessage("Correct!");
            setScore((prevScore) => prevScore + 1);
        } else {
            setMessage(`Wrong! Correct answer: ${correctTranslation}`);
        }

        if (!nextWord) {
            setIsGameActive(false);
        } else {
            setCurrentWord(nextWord);
            setNextWord(words[attempts + 2] || null);
        }

        setAttempts((prevAttempts) => prevAttempts + 1);
        setUserTranslation("");

        if (isGameActive) {
            setTimeout(() => {
                setMessage("");
            }, 50000);
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentWord, userTranslation, nextWord, words, direction, attempts, isGameActive]);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleRestart = () => {
        setGameStarted(false);
        setIsGameActive(true);
        setScore(0);
        setAttempts(0);
        setMessage("");
        setUserTranslation("");
        setWords([]);
        setCurrentWord(null);
        setNextWord(null);
    };

    const handleArticleClick = (article) => {
        if (
            userTranslation.trim() === "" ||
            !["der", "die", "das"].some((a) => userTranslation.startsWith(a))
        ) {
            const updatedTranslation = `${article} ${userTranslation.trim()}`;
            setUserTranslation(updatedTranslation);
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(updatedTranslation.length, updatedTranslation.length);
                }
            }, 0);
        }
    };

    /**для уборки клавиатуры на мобилках*/
    const handleContainerClick = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target)
        ) {
            inputRef.current.blur();
        }
    };

    useEffect(() => {
        if (gameStarted) {
            fetchWords();
        }
    }, [gameStarted, fetchWords]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" && gameStarted) {
                handleCheckTranslation();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [gameStarted, handleCheckTranslation]);

    return (
        <div className="container" onClick={handleContainerClick}>
            {!gameStarted && (
                <div className="form">
                    <label className="label">
                        Number of words:
                        <input
                            className="input"
                            type="number"
                            value={maxWords}
                            onChange={(e) => setMaxWords(Number(e.target.value))}
                            disabled={gameStarted}
                        />
                    </label>
                    <label className="label">
                        Direction:
                        <div className="toggle-container">
                            <span className={direction === "de-ru" ? "active-text" : ""}>DE → RU</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    id="directionToggle"
                                    checked={direction === "ru-de"}
                                    onChange={() => setDirection(direction === "de-ru" ? "ru-de" : "de-ru")}
                                    disabled={gameStarted}
                                />
                                <label htmlFor="directionToggle" className="toggle-slider"></label>
                            </div>
                            <span className={direction === "ru-de" ? "active-text" : ""}>RU → DE</span>
                        </div>
                    </label>
                    <button className="button" onClick={handleStartGame}>Start Game</button>
                </div>
            )}

            {gameStarted && (
                <div className="container">
                    <p className="message">Score: {score}</p>
                    {currentWord && (
                        <>
                            <p>
                                {direction === "de-ru" ? "Translate:" : "Переведите:"}{" "}
                                {direction === "de-ru" ? currentWord.word : currentWord.translation}
                            </p>
                            <input
                                className="input"
                                ref={inputRef}
                                type="text"
                                value={userTranslation}
                                onChange={(e) => setUserTranslation(e.target.value)}
                                placeholder="Enter translation"
                                disabled={!isGameActive}
                            />
                            {direction === "ru-de" && currentWord.article && (
                                <div className="buttons">
                                    <button
                                        className="article-button"
                                        disabled={!isGameActive}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleArticleClick("der")}
                                    >
                                        der
                                    </button>
                                    <button
                                        className="article-button"
                                        disabled={!isGameActive}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleArticleClick("die")}
                                    >
                                        die
                                    </button>
                                    <button
                                        className="article-button"
                                        disabled={!isGameActive}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleArticleClick("das")}
                                    >
                                        das
                                    </button>
                                </div>
                            )}
                            <div className="check-button-container">
                                <button
                                    className="check-button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleCheckTranslation}
                                    disabled={!isGameActive}
                                >
                                    Check
                                </button>
                            </div>
                            <p className="message">{message}</p>
                        </>
                    )}

                    {!isGameActive && (
                        <div className="game-over">
                            <h2>Spiel beendet!</h2>
                            <p>Your score: {score}/{maxWords}</p>
                            {(() => {
                                const percentage = (score / maxWords) * 100;
                                if (percentage === 100) {
                                    return <p>Congratulations, perfect!</p>;
                                } else if (percentage >= 90) {
                                    return <p>Congratulations, almost good!</p>;
                                } else if (percentage >= 50) {
                                    return <p>Congratulations, but it could be better!</p>;
                                } else {
                                    return <p>Congratulations, you are loser!</p>;
                                }
                            })()}
                            <button className="button" onClick={handleRestart}>Restart</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;
