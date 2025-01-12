package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NounDTO {
    private Long id;
    @NotBlank
    private String word;

    @NotBlank
    private String translation;

    @NotBlank
    @Pattern(regexp = "^(der|die|das)$", message = "Article must be 'der', 'die' or 'das'")
    private String article;
}
