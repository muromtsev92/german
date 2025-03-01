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

    @GetMapping("/{id}")
    public ResponseEntity<NounDTO> getNounById(@PathVariable Long id) {
        return ResponseEntity.ok(nounService.getNounById(id));
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
    public ResponseEntity<List<NounDTO>> getRandomNoun(@RequestParam(defaultValue = "1") int count) {
        return nounService.getRandomNoun(count).isEmpty() ?
                ResponseEntity.noContent().build()
                : ResponseEntity.ok(nounService.getRandomNoun(count));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<NounDTO>> saveNounsBulk(@RequestBody List<NounDTO> nounDtos) {
        return ResponseEntity.ok(nounService.saveNounsBulk(nounDtos));
    }
}
