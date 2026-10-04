package com.doubletake.backend.dto;

public class SwipeResponse
{
    private final boolean matched;
    private final Long matchId;

    public SwipeResponse(final boolean matched,
                         final Long matchId)
    {
        this.matched = matched;
        this.matchId = matchId;
    }

    public boolean isMatched()
    {
        return matched;
    }

    public Long getMatchId()
    {
        return matchId;
    }
}