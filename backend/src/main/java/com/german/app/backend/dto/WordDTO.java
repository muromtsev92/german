package com.german.app.backend.dto;

import lombok.Data;

@Data
public class WordDTO {
    Long id;
    String baseForm;
    String russianForm;
    String englishForm;
}
