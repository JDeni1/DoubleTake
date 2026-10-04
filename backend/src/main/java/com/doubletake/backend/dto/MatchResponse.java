package com.doubletake.backend.dto;

import java.time.LocalDateTime;

public class MatchResponse
{
    private final Long id;
    private final DuoResponse otherDuo;
    private final LocalDateTime createdAt;

    public MatchResponse(final Long id,
                         final DuoResponse otherDuo,
                         final LocalDateTime createdAt)
    {
        this.id = id;
        this.otherDuo = otherDuo;
        this.createdAt = createdAt;
    }

    public Long getId()
    {
        return id;
    }

    public DuoResponse getOtherDuo()
    {
        return otherDuo;
    }

    public LocalDateTime getCreatedAt()
    {
        return createdAt;
    }
}