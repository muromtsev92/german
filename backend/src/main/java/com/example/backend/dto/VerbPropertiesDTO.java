package com.example.backend.dto;

import com.example.backend.entity.PropertyType;
import com.example.backend.entity.Verb;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerbPropertiesDTO {
    private Long id;
    private Verb verb;
    private PropertyType type;
    private String value;
    private String meaning;
    private String example;
}

