package com.example.backend.controller;

import com.example.backend.entity.Word;
import com.example.backend.repository.WordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/words")
public class WordController {
    private final WordRepository repository;

    public WordController(WordRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Word> getAllWords() {
        return repository.findAll();
    }

    @PostMapping
    public Word addWord(@RequestBody Word word) {
        return repository.save(word);
    }

    @DeleteMapping("/{id}")
    public void deleteWord(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
