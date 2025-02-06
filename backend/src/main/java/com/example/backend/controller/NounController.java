package com.example.backend.controller;

import com.example.backend.dto.NounDTO;
import com.example.backend.service.NounService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nouns")
@RequiredArgsConstructor
public class NounController {
    private final NounService nounService;

    @GetMapping
    public ResponseEntity<List<NounDTO>> getAllNouns() {
        return ResponseEntity.ok(nounService.getAllNouns());
    }

    @PostMapping
    public ResponseEntity<NounDTO> saveNoun(@RequestBody NounDTO nounDTO) {
        return ResponseEntity.ok(nounService.saveNoun(nounDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoun(@PathVariable Long id) {
        nounService.deleteNoun(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/random")
    public ResponseEntity<NounDTO> getRandomNoun() {
        return nounService.getRandomNoun()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build()); // Оставляем ResponseEntity<NounDTO>
    }
}
