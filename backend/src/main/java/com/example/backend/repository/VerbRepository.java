package com.example.backend.repository;

import com.example.backend.entity.Verb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerbRepository extends JpaRepository<Verb, Long> {
    Optional<Verb> findByBaseForm(String baseForm);
}

