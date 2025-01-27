package com.german.app.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import com.german.app.backend.model.enums.GameType;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameType type;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;
}
