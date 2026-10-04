package com.doubletake.backend.dto;

import com.doubletake.backend.entity.DuoSwipe;

public class SwipeRequest
{
    private String fromDuoId;
    private String toDuoId;
    private String likedByUserId;
    private DuoSwipe.SwipeDirection decision;

    public String getFromDuoId()
    {
        return fromDuoId;
    }

    public void setFromDuoId(final String fromDuoId)
    {
        this.fromDuoId = fromDuoId;
    }

    public String getToDuoId()
    {
        return toDuoId;
    }

    public void setToDuoId(final String toDuoId)
    {
        this.toDuoId = toDuoId;
    }

    public String getLikedByUserId()
    {
        return likedByUserId;
    }

    public void setLikedByUserId(final String likedByUserId)
    {
        this.likedByUserId = likedByUserId;
    }

    public DuoSwipe.SwipeDirection getDecision()
    {
        return decision;
    }

    public void setDecision(final DuoSwipe.SwipeDirection decision)
    {
        this.decision = decision;
    }
}