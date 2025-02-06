package com.example.backend.service;

import com.example.backend.dto.VerbPropertiesDTO;
import com.example.backend.entity.PropertyType;
import com.example.backend.entity.VerbProperties;
import com.example.backend.mapper.VerbPropertiesMapper;
import com.example.backend.repository.VerbPropertiesRepository;
import com.example.backend.repository.VerbRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerbPropertiesService {
    private final VerbPropertiesRepository repository;
    private final VerbRepository verbRepository;
    private final VerbPropertiesMapper mapper = VerbPropertiesMapper.INSTANCE;

    public List<VerbPropertiesDTO> getAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<VerbPropertiesDTO> getByType(PropertyType type) {
        return repository.findByType(type).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public VerbPropertiesDTO addProperty(Long verbId, PropertyType type, String value, String meaning, String example) {
        var verb = verbRepository.findById(verbId)
                .orElseThrow(() -> new RuntimeException("Verb not found"));

        var property = new VerbProperties(null, verb, type, value, meaning, example);
        var saved = repository.save(property);

        return mapper.toDto(saved);
    }
}
