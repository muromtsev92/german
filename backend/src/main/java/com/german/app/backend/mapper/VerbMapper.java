package com.german.app.backend.mapper;

import com.german.app.backend.dto.VerbDTO;
import com.german.app.backend.model.Verb;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VerbMapper {
    VerbDTO toDTO(Verb verb);
    Verb toEntity(VerbDTO verbDTO);
}

