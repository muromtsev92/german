package com.german.app.backend.repository;

import com.german.app.backend.model.Verb;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface VerbRepository extends JpaRepository<Verb, Long> {
}
