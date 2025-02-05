package com.example.backend.service;

import com.example.backend.entity.PropertyType;
import com.example.backend.entity.VerbProperties;
import com.example.backend.repository.VerbPropertiesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VerbPropertiesService {
    private final VerbPropertiesRepository repository;

    public List<VerbProperties> getAll() {
        return repository.findAll();
    }

    public List<VerbProperties> getByType(PropertyType type) {
        return repository.findByType(type);
    }

    public VerbProperties addProperty(Long verbId, PropertyType type, String value, String meaning, String example) {
        VerbProperties property = new VerbProperties(null, verbId, type, value, meaning, example);
        return repository.save(property);
    }
}