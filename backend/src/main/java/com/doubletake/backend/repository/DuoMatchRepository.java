package com.doubletake.backend.repository;

import com.doubletake.backend.entity.DuoMatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DuoMatchRepository extends JpaRepository<DuoMatch, Long> {

    // Helps matchservice find all matches for a specific duo's inbox
    List<DuoMatch> findByDuoAIdOrDuoBId(String duoAId, String duoBId);

    // Helps match service check if these two duos are already matched
    boolean existsByDuoAIdAndDuoBId(String duoAId, String duoBId);
}