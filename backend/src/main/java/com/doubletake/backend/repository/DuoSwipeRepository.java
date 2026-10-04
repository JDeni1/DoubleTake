package com.doubletake.backend.repository;

import com.doubletake.backend.entity.DuoSwipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DuoSwipeRepository extends JpaRepository<DuoSwipe, Long>
{
    /**
     * Checks whether a swipe exists with the given swiper, target,
     * and swipe direction.
     *
     * @param swiperDuoId the ID of the duo that performed the swipe
     * @param targetDuoId the ID of the duo that was swiped on
     * @param swipeDirection the direction of the swipe
     * @return true if the matching swipe exists, false otherwise
     */
    boolean existsBySwiperDuoIdAndTargetDuoIdAndSwipeDirection(
            String swiperDuoId,
            String targetDuoId,
            DuoSwipe.SwipeDirection swipeDirection);
}