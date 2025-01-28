package com.german.app.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class NounDTO extends WordDTO {
    private String plural;
    private String article;
}

