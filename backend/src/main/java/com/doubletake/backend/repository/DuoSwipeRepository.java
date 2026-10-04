package com.doubletake.backend.repository;

import com.doubletake.backend.entity.DuoSwipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DuoSwipeRepository extends JpaRepository<DuoSwipe, Long> {
    
    // Used to check if a mutual swipe/match exists between two duos
    Optional<DuoSwipe> findBySwiperDuoIdAndTargetDuoId(String swiperDuoId, String targetDuoId);
}