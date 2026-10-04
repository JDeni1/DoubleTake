package com.doubletake.backend.service;


import com.doubletake.backend.entity.DuoMatch;
import com.doubletake.backend.repository.DuoSwipeRepository;
import org.springframework.stereotype.Service;
import com.doubletake.backend.entity.DuoSwipe;

@Service
public class SwipeService
{
    private final DuoSwipeRepository duoSwipeRepository;
    private final MatchService matchService;

    public SwipeService(final DuoSwipeRepository duoSwipeRepository,
                        final MatchService matchService)
    {
        this.duoSwipeRepository = duoSwipeRepository;
        this.matchService = matchService;
    }

    /**
     * Checks whether the target duo has already liked the current duo.
     *
     * @param currentDuoId the ID of the duo that is currently swiping
     * @param targetDuoId the ID of the duo being swiped on
     * @return true if the target duo previously liked the current duo,
     *         false otherwise
     */
    public boolean hasReciprocalLike(final String currentDuoId,
                                     final String targetDuoId)
    {
        return duoSwipeRepository
                .existsBySwiperDuoIdAndTargetDuoIdAndSwipeDirection(
                        targetDuoId,
                        currentDuoId,
                        DuoSwipe.SwipeDirection.LIKE);
    }

    /**
     * Processes a swipe by saving it and creating a match if both duos liked each other.
     *
     * @param currentDuoId the ID of the duo performing the swipe
     * @param targetDuoId the ID of the duo being swiped on
     * @param swipeDirection whether the swipe is a LIKE or PASS
     * @return the created match if a mutual like occurs, otherwise null
     */
    public DuoMatch processSwipe(final String currentDuoId,
                                 final String targetDuoId,
                                 final DuoSwipe.SwipeDirection swipeDirection)
    {
        saveSwipe(currentDuoId,
                targetDuoId,
                swipeDirection);

        if(swipeDirection == DuoSwipe.SwipeDirection.LIKE &&
                hasReciprocalLike(currentDuoId, targetDuoId))
        {
            return matchService.createMatch(currentDuoId, targetDuoId);
        }

        return null;
    }


    /**
     * If the person swiped to liked
     *
     * @param liked
     * @return liked
     */
    public boolean isLike(final boolean liked)
    {
        return liked;
    }

    /**
     * If the person swiped to a pass
     *
     * @param liked
     * @return passed
     */
    public boolean isPass(final boolean liked)
    {
        return !liked;
    }

    /**
     * If the program should even check for a liked or !liked
     * @param liked
     * @return
     */
    public boolean shouldCheckForMatch(final boolean liked)
    {
        return liked;
    }

    /**
     * Saves a duo's swipe on another duo in the database.
     *
     * @param currentDuoId the ID of the duo performing the swipe
     * @param targetDuoId the ID of the duo being swiped on
     * @param swipeDirection whether the swipe is a LIKE or PASS
     * @return the saved swipe
     */
    public DuoSwipe saveSwipe(final String currentDuoId,
                              final String targetDuoId,
                              final DuoSwipe.SwipeDirection swipeDirection)
    {
        final DuoSwipe swipe = new DuoSwipe(
                currentDuoId,
                targetDuoId,
                swipeDirection);

        return duoSwipeRepository.save(swipe);
    }

}
