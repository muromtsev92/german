package com.example.backend.controller;

import com.example.backend.entity.Noun;
import com.example.backend.service.NounService;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<Noun>> getAllNouns() {
        return ResponseEntity.ok(nounService.getAllNouns());
    }

    @PostMapping
    public ResponseEntity<Noun> addNoun(@Valid @RequestBody Noun noun) {
        return ResponseEntity.ok(nounService.saveNoun(noun));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoun(@PathVariable Long id) {
        nounService.deleteNoun(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/game/random")
    public ResponseEntity<Noun> getRandomNoun() {
        return nounService.getRandomNoun()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/game/check")
    public ResponseEntity<Boolean> checkTranslation(@RequestBody Map<String, String> request) {
        String word = request.get("word");
        String translation = request.get("translation");

        return nounService.findByWord(word)
                .map(noun -> ResponseEntity.ok(noun.getTranslation().equalsIgnoreCase(translation)))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Noun>> bulk(@RequestBody List<Noun> nouns) {
        return ResponseEntity.ok(nounService.addNounsBulk(nouns));
    }
}

