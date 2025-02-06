package com.example.backend.mapper;

import com.example.backend.dto.VerbDTO;
import com.example.backend.entity.Verb;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VerbMapper {
    VerbMapper INSTANCE = Mappers.getMapper(VerbMapper.class);

    VerbDTO toDto(Verb verb);
    Verb toEntity(VerbDTO verbDTO);
}

