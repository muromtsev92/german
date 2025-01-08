package com.example.backend.service;

import com.example.backend.entity.Noun;
import com.example.backend.repository.NounRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class NounService {
    private final NounRepository nounRepository;

    public List<Noun> getAllNouns() {
        return nounRepository.findAll();
    }

    public Optional<Noun> getRandomNoun() {
        List<Noun> nouns = nounRepository.findAll();
        if (nouns.isEmpty()) {
            return Optional.empty();
        }
        Random random = new Random();
        return Optional.of(nouns.get(random.nextInt(nouns.size())));
    }

    public Noun saveNoun(Noun noun) {
        nounRepository.findByWord(noun.getWord()).ifPresent(existing -> {
            throw new IllegalArgumentException("Word already exists in the database: " + existing.getArticle()
                    + " " + existing.getWord() + " - " + existing.getTranslation());
        });
        return nounRepository.save(noun);
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

}
