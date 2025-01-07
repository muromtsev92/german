package com.example.backend.repository;

import com.example.backend.entity.Noun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NounRepository extends JpaRepository<Noun, Long> {
}
