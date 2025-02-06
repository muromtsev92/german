package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "verb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Verb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String baseForm; // Основная форма глагола

    private String prateritum; // Прошедшая форма (Präteritum)
    private String partizipZwei; // Partizip II
    private String meaning; // Значение глагола

    @OneToMany(mappedBy = "verb", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<VerbProperties> properties;
}
