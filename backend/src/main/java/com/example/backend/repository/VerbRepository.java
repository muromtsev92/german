package com.example.backend.repository;

import com.example.backend.entity.Verb;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerbRepository extends JpaRepository<Verb, Long> {
    Optional<Verb> findByWord(String word);
}