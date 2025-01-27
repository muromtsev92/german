package com.german.app.backend.service;

import com.german.app.backend.model.Verb;
import org.springframework.stereotype.Service;
import com.german.app.backend.repository.VerbRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class VerbService {

    private final VerbRepository verbRepository;

    public VerbService(VerbRepository verbRepository) {
        this.verbRepository = verbRepository;
    }

    public List<Verb> findAll() {
        return verbRepository.findAll();
    }

    public Verb findById(Long id) {
        return verbRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Verb not found with ID: " + id));
    }

    public Verb save(Verb verb) {
        return verbRepository.save(verb);
    }

    public void delete(Long id) {
        if (!verbRepository.existsById(id)) {
            throw new RuntimeException("Verb not found with ID: " + id);
        }
        verbRepository.deleteById(id);
    }

//    // Найти случайные глаголы
//    public Set<Verb> findRandom(int count) {
//        return new HashSet<>(verbRepository.findRandomVerbs(count));
//    }
}
