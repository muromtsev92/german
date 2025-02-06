package com.example.backend.repository;

import com.example.backend.entity.Noun;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NounRepository extends JpaRepository<Noun, Long> {
    Optional<Noun> findByWord(String word);
}
