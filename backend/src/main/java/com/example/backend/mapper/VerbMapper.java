package com.example.backend.mapper;

import com.example.backend.dto.VerbDTO;
import com.example.backend.entity.Verb;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VerbMapper {
    VerbDTO toDTO(Verb verb);
    Verb toEntity(VerbDTO verbDTO);
}

