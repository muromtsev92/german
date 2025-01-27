package com.german.app.backend.controller;

import com.german.app.backend.dto.NounDTO;
import com.german.app.backend.dto.WordSetDTO;
import com.german.app.backend.mapper.NounMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.german.app.backend.service.NounService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/nouns")
public class NounController {

    private final NounService nounService;
    private final NounMapper nounMapper;

    @GetMapping
    public List<NounDTO> getAllNouns() {
        return nounService.findAll()
                .stream()
                .map(nounMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public NounDTO getNounById(@PathVariable Long id) {
        return nounMapper.toDTO(nounService.findById(id));
    }

    @PostMapping
    public NounDTO createNoun(@RequestBody NounDTO nounDTO) {
        return nounMapper.toDTO(nounService.save(nounMapper.toEntity(nounDTO)));
    }

    @PutMapping("/{id}")
    public NounDTO updateNoun(@PathVariable Long id, @RequestBody NounDTO nounDTO) {
        nounDTO.setId(id); // Устанавливаем ID для обновления
        return nounMapper.toDTO(nounService.save(nounMapper.toEntity(nounDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteNoun(@PathVariable Long id) {
        nounService.delete(id);
    }

    @GetMapping("/random")
    public WordSetDTO getRandomNouns(@RequestParam int count) {
        Set<NounDTO> randomNouns = nounService.findRandom(count)
                .stream()
                .map(nounMapper::toDTO)
                .collect(Collectors.toSet());

        WordSetDTO wordSetDTO = new WordSetDTO();
        wordSetDTO.setWords(randomNouns);
        return wordSetDTO;
    }
}
