package com.example.backend.controller;

import com.example.backend.dto.VerbPropertiesDTO;
import com.example.backend.service.VerbPropertiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verb-properties")
@RequiredArgsConstructor
public class VerbPropertiesController {
    private final VerbPropertiesService verbPropertiesService;

    @GetMapping
    public ResponseEntity<List<VerbPropertiesDTO>> getAllVerbProperties() {
        return ResponseEntity.ok(verbPropertiesService.getAll());
    }

    @PostMapping
    public ResponseEntity<VerbPropertiesDTO> saveVerbProperty(@RequestBody VerbPropertiesDTO verbPropertiesDTO) {
        return ResponseEntity.ok(verbPropertiesService.saveVerbProperties(verbPropertiesDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVerbProperty(@PathVariable Long id) {
        verbPropertiesService.deleteVerbProperty(id);
        return ResponseEntity.noContent().build();
    }
}
