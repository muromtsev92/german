package com.example.backend.dto;

import lombok.Data;

@Data
public class VerbDTO {
    private Long id;
    private String word;
    private String translation;
    private String prateritum;
    private String partizipZwei;
}