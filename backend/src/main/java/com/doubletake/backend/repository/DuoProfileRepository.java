package com.doubletake.backend.repository;

import com.doubletake.backend.entity.DuoProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DuoProfileRepository extends JpaRepository<DuoProfile, String> {
    // Inherits standard CRUD operations (.save(), .findById(), etc.) using duo_id as the ID type (String)
}