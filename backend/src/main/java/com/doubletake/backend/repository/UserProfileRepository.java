package com.doubletake.backend.repository;

import com.doubletake.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    // Spring Data JPA gives built-in commands like .save(), .findById(), .findAll(), etc.
}