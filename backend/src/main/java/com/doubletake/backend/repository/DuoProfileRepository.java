package com.doubletake.backend.repository;

import com.doubletake.backend.entity.DuoProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DuoProfileRepository extends JpaRepository<DuoProfile, String> {

    // Finds the top matching duos using TiDB's native vector distance function,
    // excluding the current user's own duo_id.
    @Query(value = "SELECT * FROM duo_profiles " +
                   "WHERE duo_id != :currentDuoId " +
                   "ORDER BY VEC_COSINE_DISTANCE(vibe_vector, VEC_FROM_TEXT(:targetVector)) ASC " +
                   "LIMIT 5", 
           nativeQuery = true)
    List<DuoProfile> findTopMatches(@Param("currentDuoId") String currentDuoId, 
                                    @Param("targetVector") String targetVector);
}