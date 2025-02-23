package com.example.backend.controller;

import com.example.backend.dto.NounDTO;
import com.example.backend.dto.VerbDTO;
import com.example.backend.service.VerbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verbs")
@RequiredArgsConstructor
public class VerbController {
    private final VerbService verbService;

    @GetMapping
    public ResponseEntity<List<VerbDTO>> getAllVerbs() {
        return ResponseEntity.ok(verbService.getAllVerbs());
    }

    @PostMapping
    public ResponseEntity<VerbDTO> saveVerb(@RequestBody VerbDTO verbDTO) {
        return ResponseEntity.ok(verbService.saveVerb(verbDTO));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<VerbDTO>> saveNounsBulk(@RequestBody List<VerbDTO> verbDtos) {
        return ResponseEntity.ok(verbService.saveNounsBulk(verbDtos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVerb(@PathVariable Long id) {
        verbService.deleteVerb(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/random")
    public ResponseEntity<VerbDTO> getRandomVerb() {
        return verbService.getRandomVerb()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
