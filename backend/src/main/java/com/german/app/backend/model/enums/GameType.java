package com.german.app.backend.model.enums;

public enum GameType {
    TRANSLATION, // Игра на перевод
    ARTICLES;    // Игра на артикли

    @Override
    public String toString() {
        return name().toLowerCase(); // Преобразование в нижний регистр
    }
}

