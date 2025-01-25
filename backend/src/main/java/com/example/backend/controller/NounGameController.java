package com.example.backend.controller;

import com.example.backend.entity.Noun;
import com.example.backend.service.NounService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/nouns/game")
public class NounGameController {
    private final NounService nounService;

    public NounGameController(NounService nounService) {
        this.nounService = nounService;
    }

    @GetMapping("/random")
    public ResponseEntity<Noun> getRandomNoun() {
        return nounService.getRandomNoun()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @PostMapping("/check")
    public ResponseEntity<Boolean> checkTranslation(@RequestBody Map<String, String> request) {
        String word = request.get("word");
        String translation = request.get("translation");

        return nounService.findByWord(word)
                .map(noun -> ResponseEntity.ok(noun.getTranslation().equalsIgnoreCase(translation)))
                .orElse(ResponseEntity.badRequest().build());
    }
}
