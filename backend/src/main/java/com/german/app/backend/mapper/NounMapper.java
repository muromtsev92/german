package com.german.app.backend.mapper;

import com.german.app.backend.dto.NounDTO;
import com.german.app.backend.model.Noun;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NounMapper {
    NounDTO toDTO(Noun noun);

    @Mapping(target = "id", ignore = true)
    Noun toEntity(NounDTO nounDTO);
}

