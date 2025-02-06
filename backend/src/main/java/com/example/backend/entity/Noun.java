package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Noun extends Word { // Теперь наследует поля и создаёт таблицу
    @NotBlank(message = "Article is required")
    @Pattern(regexp = "der|die|das", message = "Article must be 'der', 'die', or 'das'")
    private String article;
}

