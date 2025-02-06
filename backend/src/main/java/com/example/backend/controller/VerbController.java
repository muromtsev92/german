package com.example.backend.controller;

import com.example.backend.dto.VerbDTO;
import com.example.backend.service.VerbService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/verbs")
@RequiredArgsConstructor
public class VerbController {
    private final VerbService service;

    @GetMapping
    public List<VerbDTO> getAllVerbs() {
        return service.getAllVerbs();
    }

    @GetMapping("/{id}")
    public Optional<VerbDTO> getVerbById(@PathVariable Long id) {
        return service.getVerbById(id);
    }

    @PostMapping
    public VerbDTO addVerb(
            @RequestParam String baseForm,
            @RequestParam(required = false) String prateritum,
            @RequestParam(required = false) String partizipZwei,
            @RequestParam(required = false) String meaning) {
        return service.addVerb(baseForm, prateritum, partizipZwei, meaning);
    }
}

