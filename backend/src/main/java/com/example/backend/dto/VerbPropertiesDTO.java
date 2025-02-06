package com.example.backend.dto;

import lombok.Data;

@Data
public class VerbPropertiesDTO {
    private Long id;
    private String type;
    private String value;
    private String meaning;
    private String example;
    private Long verbId; // Связь с глаголом
}
