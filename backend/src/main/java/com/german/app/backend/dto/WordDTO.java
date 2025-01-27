package com.german.app.backend.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class WordDTO {
    Long id;
    String baseForm;
    String russianForm;
    String englishForm;
}
