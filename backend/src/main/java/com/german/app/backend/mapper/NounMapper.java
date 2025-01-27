package com.german.app.backend.mapper;

import com.german.app.backend.dto.NounDTO;
import com.german.app.backend.model.Noun;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NounMapper {
    NounDTO toDTO(Noun noun);
    Noun toEntity(NounDTO nounDTO);
}

