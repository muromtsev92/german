package com.example.backend.repository;

import com.example.backend.entity.PropertyType;
import com.example.backend.entity.VerbProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VerbPropertiesRepository extends JpaRepository<VerbProperties, Long> {
    List<VerbProperties> findByType(PropertyType type);
}