package com.german.app.backend.model.enums;

import lombok.Getter;

@Getter
public enum Article {
    DER("der"),
    DIE("die"),
    DAS("das");

    private final String value;

    Article(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
