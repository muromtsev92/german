package com.example.backend.repository;

import com.example.backend.entity.Noun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NounRepository extends JpaRepository<Noun, Long> {
    Optional<Noun> findByWord(String word);
}
