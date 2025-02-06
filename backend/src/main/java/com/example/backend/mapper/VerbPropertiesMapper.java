package com.example.backend.mapper;

import com.example.backend.dto.VerbPropertiesDTO;
import com.example.backend.entity.VerbProperties;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VerbPropertiesMapper {
    @Mapping(source = "verb.id", target = "verbId") // Связываем сущность с `verbId`
    VerbPropertiesDTO toDTO(VerbProperties verbProperties);

    @Mapping(source = "verbId", target = "verb.id") // Обратный маппинг
    VerbProperties toEntity(VerbPropertiesDTO verbPropertiesDTO);
}
