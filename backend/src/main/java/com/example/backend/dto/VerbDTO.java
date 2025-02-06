package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerbDTO {
    private Long id;
    private String baseForm;
    private String prateritum;
    private String partizipZwei;
    private String meaning;
}

