package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;
    private String translation;

    public Long getId() {
        return id;
    }

    public String getWord() {
        return word;
    }

    public String getTranslation() {
        return translation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }
}


