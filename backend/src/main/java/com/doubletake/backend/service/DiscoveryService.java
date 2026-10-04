package com.doubletake.backend.service;


public class DiscoveryService
{
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
}
