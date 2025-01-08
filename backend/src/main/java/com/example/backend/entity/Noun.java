package com.example.backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Setter
@Getter
@Entity
@DiscriminatorValue("NOUN")
public class Noun extends Word {
    @NotBlank(message = "Article is required")
    @Pattern(regexp = "der|die|das", message = "Article must be 'der', 'die', or 'das'")
    private String article;
}
