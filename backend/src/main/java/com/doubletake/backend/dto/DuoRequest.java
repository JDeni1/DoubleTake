package com.doubletake.backend.dto;

public class DuoRequest
{
    private String user1Id;
    private String user2Id;
    private String duoBio;

    public String getUser1Id()
    {
        return user1Id;
    }

    public void setUser1Id(final String user1Id)
    {
        this.user1Id = user1Id;
    }

    public String getUser2Id()
    {
        return user2Id;
    }

    public void setUser2Id(final String user2Id)
    {
        this.user2Id = user2Id;
    }

    public String getDuoBio()
    {
        return duoBio;
    }

    public void setDuoBio(final String duoBio)
    {
        this.duoBio = duoBio;
    }
}