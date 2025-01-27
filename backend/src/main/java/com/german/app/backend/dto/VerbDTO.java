package com.german.app.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class VerbDTO extends WordDTO {
    private String prateritum;
    private String partizipZwei;
}
