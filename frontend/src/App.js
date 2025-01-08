import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

function App() {
    return (
        <Router>
            <header>
                <h1>DE-RU Dictionary</h1>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/game">Spielen</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;


