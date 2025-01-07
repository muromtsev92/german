package com.example.backend.controller;

import com.example.backend.entity.Noun;
import com.example.backend.entity.Word;
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
}
