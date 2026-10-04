package com.doubletake.backend.service;

import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.repository.DuoProfileRepository;
import org.springframework.stereotype.Service;
import com.doubletake.backend.repository.DuoSwipeRepository;

import java.util.List;

@Service
public class DiscoveryService
{
    private final DuoProfileRepository duoProfileRepository;
    private final DuoSwipeRepository duoSwipeRepository;

    public DiscoveryService(final DuoProfileRepository duoProfileRepository,
                            final DuoSwipeRepository duoSwipeRepository)
    {
        this.duoProfileRepository = duoProfileRepository;
        this.duoSwipeRepository = duoSwipeRepository;
    }

    /**
     * Retrieves all duo profiles from the database.
     *
     * @return a list containing all duo profiles
     */
    public List<DuoProfile> getAllDuoProfiles()
    {
        return duoProfileRepository.findAll();
    }

    /**
     * Checks whether the candidate duo should be shown to the current duo.
     *
     * @param currentDuoId the current duo's ID
     * @param candidateDuoId the candidate duo's ID
     * @return true if the candidate duo is different from the current duo
     */
    public boolean shouldShowDuo(final String currentDuoId,
                                 final String candidateDuoId)
    {
        return !currentDuoId.equals(candidateDuoId);
    }

    /**
     * Checks if a duo is eligible for swiping
     *
     * @param alreadySwiped duo swiped
     * @param alreadyMatched duo matched
     * @return true if alreadySwiped is false and alreadyMatched is false
     */
    public boolean isEligibleCandidate(final boolean alreadySwiped,
                                       final boolean alreadyMatched)
    {
        return !alreadySwiped && !alreadyMatched;
    }

    /**
     * Filters out the current duo so it does not appear in its own discovery feed.
     *
     * @param currentDuoId the ID of the duo currently using discovery
     * @return a list of duo profiles excluding the current duo
     */
    public List<DuoProfile> getOtherDuoProfiles(final String currentDuoId)
    {
        return duoProfileRepository.findAll()
                .stream()
                .filter(duoProfile ->
                        !duoProfile.getDuoId().equals(currentDuoId))
                .toList();
    }

    /**
     * Retrieves duo profiles that the current duo has not already swiped on.
     *
     * @param currentDuoId the ID of the duo currently using discovery
     * @return a list of other duo profiles that have not already been swiped on
     */
    public List<DuoProfile> getUnswipedDuoProfiles(final String currentDuoId)
    {
        return duoProfileRepository.findAll()
                .stream()
                .filter(duoProfile ->
                        !duoProfile.getDuoId().equals(currentDuoId))
                .filter(duoProfile ->
                        !duoSwipeRepository.existsBySwiperDuoIdAndTargetDuoId(
                                currentDuoId,
                                duoProfile.getDuoId()))
                .toList();
    }
}
