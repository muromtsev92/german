package com.german.app.backend.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Article {
    DER,
    DIE,
    DAS;

    @JsonCreator
    public static Article fromString(String value) {
        return value == null ? null : Article.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name().toLowerCase(); // Вернет в JSON формате "der", "die", "das"
    }
}

