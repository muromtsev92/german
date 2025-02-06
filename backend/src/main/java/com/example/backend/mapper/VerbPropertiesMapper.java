package com.example.backend.mapper;

import com.example.backend.dto.VerbPropertiesDTO;
import com.example.backend.entity.VerbProperties;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = VerbMapper.class)
public interface VerbPropertiesMapper {
    VerbPropertiesMapper INSTANCE = Mappers.getMapper(VerbPropertiesMapper.class);

    @Mapping(source = "verb", target = "verb")
    VerbPropertiesDTO toDto(VerbProperties verbProperties);

    @Mapping(source = "verb", target = "verb")
    VerbProperties toEntity(VerbPropertiesDTO verbPropertiesDTO);
}
