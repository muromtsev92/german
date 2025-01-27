package com.german.app.backend.repository;

import com.german.app.backend.model.Noun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NounRepository extends JpaRepository<Noun, Long> {
    @Query(value = "SELECT * FROM nouns ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Noun> findRandomNouns(@Param("count") int count);
}
