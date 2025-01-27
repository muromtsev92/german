package com.german.app.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String baseForm;

    @Column(nullable = false)
    private String russianForm;

    @Column(nullable = false)
    private String englishForm;
}

