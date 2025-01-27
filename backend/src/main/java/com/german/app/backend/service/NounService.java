package com.german.app.backend.service;

import com.german.app.backend.model.Noun;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.german.app.backend.repository.NounRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NounService {

    private final NounRepository nounRepository;

    public List<Noun> findAll() {
        return nounRepository.findAll();
    }

    public Noun findById(Long id) {
        return nounRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Noun not found with ID: " + id));
    }

    public Noun save(Noun noun) {
        return nounRepository.save(noun);
    }

    public void delete(Long id) {
        if (!nounRepository.existsById(id)) {
            throw new RuntimeException("Noun not found with ID: " + id);
        }
        nounRepository.deleteById(id);
    }

    public Set<Noun> findRandom(int count) {
        return new HashSet<>(nounRepository.findRandomNouns(count));
    }
}
