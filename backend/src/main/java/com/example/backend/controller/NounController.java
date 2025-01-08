package com.example.backend.controller;

import com.example.backend.entity.Noun;

import java.util.Map;
import java.util.Random;
import com.example.backend.repository.NounRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nouns")
public class NounController {
    private final NounRepository nounRepository;

    public NounController(NounRepository nounRepository) {
        this.nounRepository = nounRepository;
    }

    @GetMapping
    public List<Noun> getAllNouns() {
        return nounRepository.findAll();
    }

    @PostMapping
    public Noun addWord(@RequestBody Noun noun) {
        return nounRepository.save(noun);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        nounRepository.deleteById(id);
    }

    @GetMapping("/game/random")
    public Noun getRandomNoun() {
        List<Noun> nouns = nounRepository.findAll();
        if (nouns.isEmpty()) {
            throw new IllegalStateException("No nouns available");
        }
        Random random = new Random();
        return nouns.get(random.nextInt(nouns.size()));
    }

    @PostMapping("/game/check")
    public boolean checkTranslation(@RequestBody Map<String, String> request) {
        String word = request.get("word");
        String userTranslation = request.get("translation");

        Noun noun = nounRepository.findByWord(word)
                .orElseThrow(() -> new IllegalStateException("Word not found"));

        return noun.getTranslation().equalsIgnoreCase(userTranslation);
    }

    @PostMapping("/bulk")
    public List<Noun> addNounsBulk(@RequestBody List<Noun> nouns) {
        return nounRepository.saveAll(nouns);
    }

}
