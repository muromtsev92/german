package com.example.backend.service;

import com.example.backend.dto.VerbPropertiesDTO;
import com.example.backend.entity.VerbProperties;
import com.example.backend.mapper.VerbPropertiesMapper;
import com.example.backend.repository.VerbPropertiesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerbPropertiesService {
    private final VerbPropertiesRepository verbPropertiesRepository;
    private final VerbPropertiesMapper verbPropertiesMapper;

    public List<VerbPropertiesDTO> getAll() {
        return verbPropertiesRepository.findAll()
                .stream()
                .map(verbPropertiesMapper::toDTO)
                .collect(Collectors.toList());
    }

    public VerbPropertiesDTO saveVerbProperties(VerbPropertiesDTO dto) {
        VerbProperties entity = verbPropertiesMapper.toEntity(dto);
        return verbPropertiesMapper.toDTO(verbPropertiesRepository.save(entity));
    }

    public void deleteVerbProperty(Long id) {
        verbPropertiesRepository.deleteById(id);
    }
}
