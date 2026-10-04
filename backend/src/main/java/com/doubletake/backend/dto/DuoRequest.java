package com.doubletake.backend.dto;

/**
 * Stores duo creation data sent from the frontend.
 */
public class DuoRequest
{
    private String duoId;
    private String userAId;
    private String userBId;

    public String getDuoId()
    {
        return duoId;
    }

    public void setDuoId(final String duoId)
    {
        this.duoId = duoId;
    }

    public String getUserAId()
    {
        return userAId;
    }

    public void setUserAId(final String userAId)
    {
        this.userAId = userAId;
    }

    public String getUserBId()
    {
        return userBId;
    }

    public void setUserBId(final String userBId)
    {
        this.userBId = userBId;
    }
}