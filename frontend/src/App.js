import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import GuessArticleGame from "./GuessArticleGame"; // Импорт нового компонента

const styles = {
    headerContainer: {
        textAlign: "center",
        marginBottom: "20px",
    },
    navLinks: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        fontSize: "1rem",
    },
    navLink: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "color 0.3s",
    },
    navLinkHover: {
        color: "#0056b3",
    },
};

function App() {
    return (
        <Router>
            <header style={styles.headerContainer}>
                <h1>DE-RU Dictionary</h1>
                <nav>
                    <Link to="/">Home</Link> |
                    <Link to="/game">Übersetzen</Link> |
                    <Link to="/guess-article">Den Artikel raten</Link> {/* Новая ссылка */}
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/guess-article" element={<GuessArticleGame />} /> {/* Новый маршрут */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
