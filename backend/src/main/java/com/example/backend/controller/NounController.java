package com.example.backend.controller;

import com.example.backend.dto.NounDTO;
import com.example.backend.entity.Noun;
import com.example.backend.service.NounService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nouns")
public class NounController {
    private final NounService nounService;

    public NounController(NounService nounService) {
        this.nounService = nounService;
    }

    @GetMapping
    public ResponseEntity<List<NounDTO>> getAllNouns() {
        return ResponseEntity.ok(nounService.getAllNouns());
    }

    @PostMapping
    public ResponseEntity<NounDTO> addNoun(@Valid @RequestBody NounDTO nounDTO) {
        return ResponseEntity.ok(nounService.saveNoun(nounDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoun(@PathVariable Long id) {
        nounService.deleteNoun(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Noun>> bulk(@RequestBody List<Noun> nouns) {
        return ResponseEntity.ok(nounService.addNounsBulk(nouns));
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<NounDTO>> getNounsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(nounService.getNounsPaged(page, size));
    }

    @PostMapping("/check")
    public ResponseEntity<Boolean> checkArticle(@RequestBody Map<String, String> request) {
        String word = request.get("word");
        String article = request.get("article");

        boolean isCorrect = nounService.checkArticle(word, article);
        return ResponseEntity.ok(isCorrect);
    }
}

