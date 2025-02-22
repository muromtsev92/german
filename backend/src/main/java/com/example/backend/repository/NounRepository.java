package com.example.backend.repository;

import com.example.backend.entity.Noun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface NounRepository extends JpaRepository<Noun, Long> {
    Optional<Noun> findByWord(String word);

    @Query(value = "SELECT * FROM noun ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Noun> findRandomNouns(@Param("count") int count);
}

