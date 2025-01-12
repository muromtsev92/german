package com.example.backend.mapper;

import com.example.backend.dto.NounDTO;
import com.example.backend.entity.Noun;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // Используем Spring для внедрения зависимостей
public interface NounMapper {

    // Преобразование сущности в DTO
    NounDTO toDTO(Noun noun);

    // Преобразование DTO в сущность
    @Mapping(target = "id", ignore = true) // Игнорируем поле id
    Noun toEntity(NounDTO nounDTO);
}

