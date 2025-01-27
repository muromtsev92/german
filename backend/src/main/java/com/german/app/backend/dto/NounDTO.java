package com.german.app.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import com.german.app.backend.model.enums.Article;

@EqualsAndHashCode(callSuper = true)
@Data
public class NounDTO extends WordDTO {
    private Article article;
}

