package com.doubletake.backend.service;

import com.doubletake.backend.entity.DuoProfile;

import java.util.List;

/**
 * Check matches between two duos
 */

public class MatchService
{
    /**
     * If two pairs are matched.
     *
     * @param duoALikedDuoB
     * @param duoBLikedDuoA
     *
     * @return true when two pairs are matched
     */
    public boolean isMatch(final boolean duoALikedDuoB,
                           final boolean duoBLikedDuoA)
    {
       return duoALikedDuoB && duoBLikedDuoA;
    }

    /**
     * Creates a match between two duos
     * @param duoA
     * @param duoB
     */
    public void createMatch(final DuoProfile duoA,
                            final DuoProfile duoB)
    {
        //need the Match entity
        //need MatchRepository
    }

    /**
     * Checks if this match exisits already
     *
     * @param duoAId
     * @param duoBId
     * @return
     */
    public boolean matchExists(final boolean duoAId,
                               final boolean duoBId)
    {
        //need MatchRepository

        return false;
    }

    public List<DuoProfile> getMatchesForDuo(final long duoId)
    {
        //ask MatchRepository

        return null;
    }




}
