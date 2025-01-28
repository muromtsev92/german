package com.german.app.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import com.german.app.backend.model.enums.Article;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "nouns")
public class Noun extends Word {
    private String plural;

    @Enumerated(EnumType.STRING)
    private Article article;
}

