import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Game = () => {
    // Состояния для игры
    const [words, setWords] = useState([]); // Список слов
    const [currentWord, setCurrentWord] = useState(null); // Текущее слово
    const [nextWord, setNextWord] = useState(null); // Следующее слово
    const [userTranslation, setUserTranslation] = useState(""); // Ответ пользователя
    const [score, setScore] = useState(0); // Количество правильных ответов
    const [attempts, setAttempts] = useState(0); // Количество попыток
    const [maxWords, setMaxWords] = useState(5); // Максимальное количество слов
    const [direction, setDirection] = useState("de-ru"); // Направление перевода
    const [message, setMessage] = useState(""); // Сообщение о результате
    const [gameStarted, setGameStarted] = useState(false); // Флаг начала игры

    const inputRef = useRef(null); // Ссылка на поле ввода для перемещения курсора

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // URL API

    // Запрос слов из базы данных при начале игры
    useEffect(() => {
        if (gameStarted) {
            fetchWords();
        }
    }, [gameStarted]);

    // Запрашивает слова из API и перемешивает их
    const fetchWords = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/nouns`);
        const shuffledWords = response.data.sort(() => Math.random() - 0.5); // Перемешивание списка
        setWords(shuffledWords.slice(0, maxWords)); // Ограничиваем количество слов
        setCurrentWord(shuffledWords[0]); // Устанавливаем первое слово
        setNextWord(shuffledWords[1] || null); // Устанавливаем следующее слово
    };

    // Начинает игру
    const handleStartGame = () => {
        setGameStarted(true);
    };

    // Проверяет ответ пользователя
    const handleCheckTranslation = () => {
        if (!currentWord) return;

        // Определяем правильный перевод в зависимости от направления
        const correctTranslation =
            direction === "de-ru" ? currentWord.translation : `${currentWord.article} ${currentWord.word}`;

        // Сравниваем ответ пользователя с правильным переводом
        if (userTranslation.trim().toLowerCase() === correctTranslation.toLowerCase()) {
            setMessage("Correct!");
            setScore(score + 1); // Увеличиваем счёт
        } else {
            setMessage(`Wrong! Correct answer: ${correctTranslation}`);
        }

        // Переходим к следующему слову
        setCurrentWord(nextWord);
        const nextIndex = attempts + 1;
        setNextWord(words[nextIndex + 1] || null);

        // Очищаем сообщение через 2 секунды
        setTimeout(() => {
            setMessage("");
        }, 2000);

        setAttempts(attempts + 1); // Увеличиваем количество попыток
        setUserTranslation(""); // Сбрасываем ввод пользователя
    };

    // Перезапускает игру
    const handleRestart = () => {
        setGameStarted(false);
        setScore(0);
        setAttempts(0);
        setMessage("");
        setUserTranslation("");
        setWords([]);
        setCurrentWord(null);
        setNextWord(null);
    };

    // Обрабатывает нажатие кнопки с артиклем
    const handleArticleClick = (article) => {
        // Проверяем, можно ли добавить артикль
        if (
            userTranslation.trim() === "" ||
            !["der", "die", "das"].some((a) => userTranslation.startsWith(a))
        ) {
            const updatedTranslation = `${article} ${userTranslation.trim()}`;
            setUserTranslation(updatedTranslation); // Добавляем артикль

            // Перемещаем курсор в конец текста
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(updatedTranslation.length, updatedTranslation.length);
                }
            }, 0);
        }
    };


    return (
        <div>
            <h1>Translation Game</h1>
            {/* Настройки перед началом игры */}
            {!gameStarted && (
                <div>
                    <label>
                        Number of words:
                        <input
                            type="number"
                            value={maxWords}
                            onChange={(e) => setMaxWords(Number(e.target.value))}
                            disabled={gameStarted}
                        />
                    </label>
                    <label>
                        Direction:
                        <select
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            disabled={gameStarted}
                        >
                            <option value="de-ru">German to Russian</option>
                            <option value="ru-de">Russian to German</option>
                        </select>
                    </label>
                    <button onClick={handleStartGame}>Start Game</button>
                </div>
            )}
            {/* Основной игровой процесс */}
            {gameStarted && currentWord && (
                <div>
                    <p>Score: {score}</p>
                    <p>
                        {direction === "de-ru" ? "Translate:" : "Переведите:"}{" "}
                        {direction === "de-ru" ? currentWord.word : currentWord.translation}
                    </p>
                    <input
                        ref={inputRef} // Привязываем ссылку для управления курсором
                        type="text"
                        value={userTranslation}
                        onChange={(e) => setUserTranslation(e.target.value)}
                        placeholder="Enter translation"
                    />
                    {/* Кнопки артиклей */}
                    {direction === "ru-de" && currentWord.article && (
                        <div>
                            <button
                                onClick={() => handleArticleClick("der")}
                                disabled={["der", "di", "da"].some((a) =>
                                    userTranslation.toLowerCase().startsWith(a)
                                )}
                            >
                                der
                            </button>
                            <button
                                onClick={() => handleArticleClick("die")}
                                disabled={["der", "di", "da"].some((a) =>
                                    userTranslation.toLowerCase().startsWith(a)
                                )}
                            >
                                die
                            </button>
                            <button
                                onClick={() => handleArticleClick("das")}
                                disabled={["der", "di", "da"].some((a) =>
                                    userTranslation.toLowerCase().startsWith(a)
                                )}
                            >
                                das
                            </button>
                        </div>
                    )}
                    <button onClick={handleCheckTranslation}>Check</button>
                    <p>{message}</p>
                    <p>Remaining: {maxWords - attempts}</p>
                </div>
            )}
            {/* Конец игры */}
            {gameStarted && !currentWord && (
                <div>
                    <h2>Game Over!</h2>
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
                    <button onClick={handleRestart}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default Game;
