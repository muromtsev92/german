package com.example.backend.service;

import com.example.backend.dto.VerbDTO;
import com.example.backend.entity.Verb;
import com.example.backend.mapper.VerbMapper;
import com.example.backend.repository.VerbRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerbService {
    private final VerbRepository repository;
    private final VerbMapper mapper = VerbMapper.INSTANCE;

    public List<VerbDTO> getAllVerbs() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<VerbDTO> getVerbById(Long id) {
        return repository.findById(id).map(mapper::toDto);
    }

    public VerbDTO addVerb(String baseForm, String prateritum, String partizipZwei, String meaning) {
        Verb verb = new Verb(null, baseForm, prateritum, partizipZwei, meaning, null);
        return mapper.toDto(repository.save(verb));
    }
}

