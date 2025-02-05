package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "verb_properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerbProperties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long verbId; // Пока без связи, но позже заменим на @ManyToOne

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType type; // PREPOSITION, PARTIZIP_II

    @Column(nullable = false)
    private String value; // Само значение (предлог или Partizip II)

    private String meaning; // Значение

    private String example; // Пример использования
}

