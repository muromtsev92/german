package com.example.backend.mapper;

import com.example.backend.dto.NounDTO;
import com.example.backend.entity.Noun;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NounMapper {
    NounDTO toDTO(Noun noun);
    Noun toEntity(NounDTO nounDTO);
}


