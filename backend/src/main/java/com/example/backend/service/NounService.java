package com.example.backend.service;

import com.example.backend.dto.NounDTO;
import com.example.backend.entity.Noun;
import com.example.backend.mapper.NounMapper;
import com.example.backend.repository.NounRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NounService {
    private final NounRepository nounRepository;
    private final NounMapper nounMapper;

    public List<NounDTO> getAllNouns() {
        return nounRepository.findAll()
                .stream()
                .map(nounMapper::toDTO)
                .collect(Collectors.toList());
    }

    public NounDTO getNounById(Long id) {
        return nounRepository.findById(id)
                .map(nounMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Noun with id " + id + " not found"));
    }

    public List<NounDTO> getRandomNoun(int number) {
        List<Noun> nouns = nounRepository.findRandomNouns(number);
        List<NounDTO> result = new ArrayList<>();
        for (Noun noun : nouns) {
            result.add(nounMapper.toDTO(noun));
        }
        return result;
    }

    public NounDTO saveNoun(NounDTO nounDto) {
        nounRepository.findByWord(nounDto.getWord()).ifPresent(existing -> {
            throw new IllegalArgumentException("Word already exists in the database: " + existing.getArticle()
                    + " " + existing.getWord() + " - " + existing.getTranslation());
        });
        Noun noun = nounMapper.toEntity(nounDto);
        return nounMapper.toDTO(nounRepository.save(noun));
    }

    public void deleteNoun(Long id) {
        nounRepository.deleteById(id);
    }

    public Optional<NounDTO> findByWord(String word) {
        return nounRepository.findByWord(word).map(nounMapper::toDTO);
    }

    public List<NounDTO> saveNounsBulk(List<NounDTO> nounDtos) {
        List<Noun> nouns = nounDtos.stream()
                .map(nounMapper::toEntity)
                .collect(Collectors.toList());

        List<Noun> savedNouns = nounRepository.saveAll(nouns);
        return savedNouns.stream()
                .map(nounMapper::toDTO)
                .collect(Collectors.toList());
    }
}
