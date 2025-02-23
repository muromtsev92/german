package com.example.backend.service;

import com.example.backend.dto.NounDTO;
import com.example.backend.dto.VerbDTO;
import com.example.backend.entity.Noun;
import com.example.backend.entity.Verb;
import com.example.backend.mapper.VerbMapper;
import com.example.backend.repository.VerbRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VerbService {
    private final VerbRepository verbRepository;
    private final VerbMapper verbMapper;

    public List<VerbDTO> getAllVerbs() {
        return verbRepository.findAll()
                .stream()
                .map(verbMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<VerbDTO> getRandomVerb() {
        List<Verb> verbs = verbRepository.findAll();
        if (verbs.isEmpty()) {
            return Optional.empty();
        }
        Random random = new Random();
        return Optional.of(verbMapper.toDTO(verbs.get(random.nextInt(verbs.size()))));
    }

    public VerbDTO saveVerb(VerbDTO verbDTO) {
        Verb verb = verbMapper.toEntity(verbDTO);
        return verbMapper.toDTO(verbRepository.save(verb));
    }

    public void deleteVerb(Long id) {
        verbRepository.deleteById(id);
    }

    public List<VerbDTO> saveNounsBulk(List<VerbDTO> verbDtos) {
        List<Verb> verbs = verbDtos.stream()
                .map(verbMapper::toEntity)
                .collect(Collectors.toList());

        List<Verb> savedVerbs = verbRepository.saveAll(verbs);
        return savedVerbs.stream()
                .map(verbMapper::toDTO)
                .collect(Collectors.toList());
    }
}
