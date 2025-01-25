package com.example.backend.service;

import com.example.backend.dto.NounDTO;
import com.example.backend.entity.Noun;
import com.example.backend.mapper.NounMapper;
import com.example.backend.repository.NounRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.Random;
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

    public Optional<Noun> getRandomNoun() {
        List<Noun> nouns = nounRepository.findAll();
        if (nouns.isEmpty()) {
            return Optional.empty();
        }
        Random random = new Random();
        return Optional.of(nouns.get(random.nextInt(nouns.size())));
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

    public Optional<Noun> findByWord(String word) {
        return nounRepository.findByWord(word);
    }

    public List<Noun> addNounsBulk(List<Noun> nouns) {
        return nounRepository.saveAll(nouns);
    }

    public Page<NounDTO> getNounsPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return nounRepository.findAll(pageable)
                .map(nounMapper::toDTO);
    }

    public boolean checkArticle(String word, String article) {
        return nounRepository.findByWord(word)
                .map(noun -> noun.getArticle().equalsIgnoreCase(article))
                .orElse(false);
    }
}
