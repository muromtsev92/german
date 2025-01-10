import React from "react";
import WordManager from "./WordManager";

const styles = {
    textCenter: {
    textAlign: "center"
    }
}

const Home = () => {
    return (
        <div>
            <h1 style={styles.textCenter}>Wörterliste</h1>
            <WordManager />
        </div>
    );
};

export default Home;

