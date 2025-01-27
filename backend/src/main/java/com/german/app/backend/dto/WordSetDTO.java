package com.german.app.backend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class WordSetDTO {
    private Set<? extends WordDTO> words;
}

