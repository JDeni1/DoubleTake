package com.doubletake.backend.service;

import com.doubletake.backend.dto.DuoResponse;
import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.repository.DuoMatchRepository;
import com.doubletake.backend.repository.DuoProfileRepository;
import org.springframework.stereotype.Service;
import com.doubletake.backend.repository.DuoSwipeRepository;

import java.util.List;

@Service
public class DiscoveryService
{
    private final DuoProfileRepository duoProfileRepository;
    private final DuoSwipeRepository duoSwipeRepository;
    private final DuoMatchRepository duoMatchRepository;
    private final DuoProfileService duoProfileService;
    private final DuoService duoService;

    public DiscoveryService(final DuoProfileRepository duoProfileRepository,
                            final DuoSwipeRepository duoSwipeRepository,
                            final DuoMatchRepository duoMatchRepository,
                            final DuoProfileService duoProfileService,
                            final DuoService duoService)
    {
        this.duoProfileRepository = duoProfileRepository;
        this.duoSwipeRepository = duoSwipeRepository;
        this.duoMatchRepository = duoMatchRepository;
        this.duoProfileService = duoProfileService;
        this.duoService = duoService;
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
     * Checks whether two duos are already matched.
     *
     * @param duoAId the ID of duo A
     * @param duoBId the ID of duo B
     * @return true if a match already exists between the two duos,
     *         false otherwise
     */
    public boolean areAlreadyMatched(final String duoAId,
                                     final String duoBId)
    {
        return duoMatchRepository.existsByDuoAIdAndDuoBId(duoAId, duoBId)
                ||
                duoMatchRepository.existsByDuoAIdAndDuoBId(duoBId, duoAId);
    }

    /**
     * Retrieves duo profiles that are eligible to appear in the current duo's
     * discovery feed.
     *
     * @param currentDuoId the ID of the duo currently using discovery
     * @return a list of eligible duo profiles
     */
    public List<DuoProfile> getEligibleDuoProfiles(final String currentDuoId)
    {
        final DuoProfile currentDuo =
                duoProfileRepository.findById(currentDuoId).orElse(null);

        if(currentDuo == null)
        {
            return List.of();
        }

        return duoProfileRepository.findAll()
                .stream()
                .filter(duoProfile ->
                        !duoProfile.getDuoId().equals(currentDuoId))
                .filter(duoProfile ->
                        !duoSwipeRepository.existsBySwiperDuoIdAndTargetDuoId(
                                currentDuoId,
                                duoProfile.getDuoId()))
                .filter(duoProfile ->
                        !areAlreadyMatched(
                                currentDuoId,
                                duoProfile.getDuoId()))
                .filter(duoProfile ->
                        duoProfileService.isCompatibleLookingFor(
                                currentDuo.getLookingFor(),
                                duoProfile.getLookingFor()))
                .toList();
    }

    /**
     * Retrieves eligible duos in the format expected by the frontend.
     *
     * @param currentDuoId the ID of the current duo
     * @return eligible duo responses
     */
    public List<DuoResponse> getEligibleDuoResponses(final String currentDuoId)
    {
        return getEligibleDuoProfiles(currentDuoId)
                .stream()
                .map(duoProfile ->
                        duoService.getDuoResponse(duoProfile.getDuoId()))
                .filter(duoResponse -> duoResponse != null)
                .toList();
    }

    /**
     * Searches eligible duo profiles using the duo bio text.
     *
     * @param query the search text
     * @param currentDuoId the current duo ID
     * @return matching duos in the format expected by the frontend
     */
    public List<DuoResponse> searchDuoResponses(final String query,
                                                final String currentDuoId)
    {
        final String searchText = query.toLowerCase();

        return getEligibleDuoProfiles(currentDuoId)
                .stream()
                .filter(duoProfile ->
                        duoProfile.getCombinedVibeText() != null &&
                                duoProfile.getCombinedVibeText()
                                        .toLowerCase()
                                        .contains(searchText))
                .map(duoProfile ->
                        duoService.getDuoResponse(duoProfile.getDuoId()))
                .filter(duoResponse -> duoResponse != null)
                .toList();
    }
}
