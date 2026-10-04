package com.doubletake.backend.service;

import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.repository.DuoProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DuoProfileService
{
    private final DuoProfileRepository duoProfileRepository;

    public DuoProfileService(final DuoProfileRepository duoProfileRepository)
    {
        this.duoProfileRepository = duoProfileRepository;
    }

    /**
     * Finds a duo profile in the database using the duo's ID.
     *
     * @param duoId the ID of the duo
     * @return the duo profile if it exists, otherwise null
     */
    public DuoProfile getDuoProfile(final String duoId)
    {
        return duoProfileRepository.findById(duoId).orElse(null);
    }


    /**
     * Checks whether the selected age range is valid for duo preferences.
     *
     * @param minAge the minimum age the duo wants to see
     * @param maxAge the maximum age the duo wants to see
     * @return true if the minimum age is at least 18,
     *         the maximum age is no greater than 99,
     *         and the minimum age is not greater than the maximum age
     */
    public boolean isValidAgeRange(final Integer minAge,
                                   final Integer maxAge)
    {
        return minAge >= 18 && maxAge >= minAge;
    }

    /**
     * Checks whether two duos are looking for compatible types of connections.
     *
     * @param duoALookingFor what duo A is looking for
     * @param duoBLookingFor what duo B is looking for
     * @return true if both duos are compatible, false otherwise
     */
    public boolean isCompatibleLookingFor(
            final DuoProfile.LookingFor duoALookingFor,
            final DuoProfile.LookingFor duoBLookingFor)
    {
        return duoALookingFor == DuoProfile.LookingFor.EITHER ||
                duoBLookingFor == DuoProfile.LookingFor.EITHER ||
                duoALookingFor == duoBLookingFor;
    }

    /**
     * Checks whether a duo has at least one prompt answer saved in its profile.
     *
     * @param promptAnswers the duo's saved prompt answers
     * @return true if prompt answers exist and are not empty, false otherwise
     */
    public boolean hasPromptAnswers(final Map<String, Object> promptAnswers)
    {
        return promptAnswers != null && !promptAnswers.isEmpty();
    }

    /**
     * Checks whether the duo has combined vibe text saved in its profile.
     *
     * @param combinedVibeText the duo's combined vibe description
     * @return true if the vibe text exists and is not blank, false otherwise
     */
    public boolean hasCombinedVibeText(final String combinedVibeText)
    {
        return combinedVibeText != null &&
                !combinedVibeText.isBlank();
    }

    /**
     * Checks whether the duo has a vibe vector saved in its profile.
     *
     * @param vibeVector the duo's generated vibe vector
     * @return true if the vibe vector exists and is not blank, false otherwise
     */
    public boolean hasVibeVector(final String vibeVector)
    {
        return vibeVector != null &&
                !vibeVector.isBlank();
    }

    /**
     * Saves a new duo profile or updates an existing duo profile in the database.
     *
     * @param duoProfile the duo profile to save
     * @return the saved duo profile
     */
    public DuoProfile saveDuoProfile(final DuoProfile duoProfile)
    {
        return duoProfileRepository.save(duoProfile);
    }
}
