package com.example.backend.dto;

import lombok.Data;

@Data
public class NounDTO {
    private Long id;
    private String word;
    private String translation;
    private String article;
}

