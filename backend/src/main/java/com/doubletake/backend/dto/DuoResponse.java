package com.doubletake.backend.dto;

import java.util.List;

public class DuoResponse
{
    private final String id;
    private final String duoBio;
    private final List<UserResponse> users;

    public DuoResponse(final String id,
                       final String duoBio,
                       final List<UserResponse> users)
    {
        this.id = id;
        this.duoBio = duoBio;
        this.users = users;
    }

    public String getId()
    {
        return id;
    }

    public String getDuoBio()
    {
        return duoBio;
    }

    public List<UserResponse> getUsers()
    {
        return users;
    }
}