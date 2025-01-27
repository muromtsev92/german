package com.german.app.backend.controller;

import com.german.app.backend.dto.VerbDTO;
import com.german.app.backend.dto.WordDTO;
import com.german.app.backend.dto.WordSetDTO;
import com.german.app.backend.mapper.VerbMapper;
import org.springframework.web.bind.annotation.*;
import com.german.app.backend.service.VerbService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/verbs")
public class VerbController {

    private final VerbService verbService;
    private final VerbMapper verbMapper;

    public VerbController(VerbService verbService, VerbMapper verbMapper) {
        this.verbService = verbService;
        this.verbMapper = verbMapper;
    }

    @GetMapping
    public List<VerbDTO> getAllVerbs() {
        return verbService.findAll()
                .stream()
                .map(verbMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VerbDTO getVerbById(@PathVariable Long id) {
        return verbMapper.toDTO(verbService.findById(id));
    }

    @PostMapping
    public VerbDTO createVerb(@RequestBody VerbDTO verbDTO) {
        return verbMapper.toDTO(verbService.save(verbMapper.toEntity(verbDTO)));
    }

    @PutMapping("/{id}")
    public VerbDTO updateVerb(@PathVariable Long id, @RequestBody VerbDTO verbDTO) {
        verbDTO.setId(id); // Устанавливаем ID для обновления
        return verbMapper.toDTO(verbService.save(verbMapper.toEntity(verbDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteVerb(@PathVariable Long id) {
        verbService.delete(id);
    }

//    @GetMapping("/random")
//    public WordSetDTO getRandomVerbs(@RequestParam int count) {
//        Set<WordDTO> randomVerbs = verbService.findRandom(count)
//                .stream()
//                .map(verbMapper::toDTO)
//                .collect(Collectors.toSet());
//
//        WordSetDTO wordSetDTO = new WordSetDTO();
//        wordSetDTO.setWords(randomVerbs);
//        return wordSetDTO;
//    }
}
