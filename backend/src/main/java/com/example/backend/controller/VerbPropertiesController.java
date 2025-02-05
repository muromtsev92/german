package com.example.backend.controller;

import com.example.backend.entity.PropertyType;
import com.example.backend.entity.VerbProperties;
import com.example.backend.service.VerbPropertiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/verb-properties")
@RequiredArgsConstructor
public class VerbPropertiesController {
    private final VerbPropertiesService service;

    @GetMapping
    public List<VerbProperties> getAll() {
        return service.getAll();
    }

    @GetMapping("/type/{type}")
    public List<VerbProperties> getByType(@PathVariable PropertyType type) {
        return service.getByType(type);
    }

    @PostMapping
    public VerbProperties addProperty(
            @RequestParam Long verbId,
            @RequestParam PropertyType type,
            @RequestParam String value,
            @RequestParam(required = false) String meaning,
            @RequestParam(required = false) String example) {
        return service.addProperty(verbId, type, value, meaning, example);
    }
}