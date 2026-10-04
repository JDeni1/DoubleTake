package com.doubletake.backend.service;

import com.doubletake.backend.entity.DuoMatch;
import com.doubletake.backend.repository.DuoMatchRepository;
import org.springframework.stereotype.Service;
import com.doubletake.backend.dto.DuoResponse;
import com.doubletake.backend.dto.MatchResponse;

import java.util.List;
import java.util.List;

@Service
public class MatchService
{
    private final DuoMatchRepository duoMatchRepository;
    private final DuoService duoService;

    public MatchService(final DuoMatchRepository duoMatchRepository,
                        final DuoService duoService)
    {
        this.duoMatchRepository = duoMatchRepository;
        this.duoService = duoService;
    }

    /**
     * Checks whether two duos have mutually liked each other.
     *
     * @param duoALikedDuoB whether duo A liked duo B
     * @param duoBLikedDuoA whether duo B liked duo A
     * @return true if both duos liked each other, false otherwise
     */
    public boolean isMatch(final boolean duoALikedDuoB,
                           final boolean duoBLikedDuoA)
    {
        return duoALikedDuoB && duoBLikedDuoA;
    }

    /**
     * Checks whether a match already exists between two duos.
     *
     * @param duoAId the ID of duo A
     * @param duoBId the ID of duo B
     * @return true if the two duos are already matched, false otherwise
     */
    public boolean matchExists(final String duoAId,
                               final String duoBId)
    {
        return duoMatchRepository.existsByDuoAIdAndDuoBId(
                duoAId,
                duoBId)
                ||
                duoMatchRepository.existsByDuoAIdAndDuoBId(
                        duoBId,
                        duoAId);
    }

    /**
     * Creates and saves a match between two duos if one does not already exist.
     *
     * @param duoAId the ID of duo A
     * @param duoBId the ID of duo B
     * @return the newly created match, or null if the match already exists
     */
    public DuoMatch createMatch(final String duoAId,
                                final String duoBId)
    {
        if(matchExists(duoAId, duoBId))
        {
            return null;
        }

        final DuoMatch duoMatch = new DuoMatch(duoAId, duoBId);

        return duoMatchRepository.save(duoMatch);
    }

    /**
     * Retrieves all matches involving the specified duo.
     *
     * @param duoId the ID of the duo
     * @return a list of all matches involving the duo
     */
    public List<DuoMatch> getMatchesForDuo(final String duoId)
    {
        return duoMatchRepository.findByDuoAIdOrDuoBId(
                duoId,
                duoId);
    }

    /**
     * Retrieves matches in the format expected by the frontend.
     *
     * @param duoId the current duo ID
     * @return matches containing the other duo's information
     */
    public List<MatchResponse> getMatchResponses(final String duoId)
    {
        return duoMatchRepository.findByDuoAIdOrDuoBId(duoId, duoId)
                .stream()
                .map(match ->
                {
                    final String otherDuoId =
                            match.getDuoAId().equals(duoId)
                                    ? match.getDuoBId()
                                    : match.getDuoAId();

                    final DuoResponse otherDuo =
                            duoService.getDuoResponse(otherDuoId);

                    return new MatchResponse(
                            match.getId(),
                            otherDuo,
                            match.getMatchedAt());
                })
                .toList();
    }
}