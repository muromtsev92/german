package com.example.backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("NOUN") // Уникальный тип для существительных
public class Noun extends Word {
    private String article;

    public String getArticle() {
        return article;
    }
    public void setArticle(String article) {
        this.article = article;
    }
}
