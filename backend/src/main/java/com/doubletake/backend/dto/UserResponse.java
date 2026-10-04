package com.doubletake.backend.dto;

import java.util.List;
import java.util.Map;

public class UserResponse
{
    private final String id;
    private final String name;
    private final Integer age;
    private final String imageUrl;
    private final List<String> interests;

    public UserResponse(final String id,
                        final String name,
                        final Integer age,
                        final String imageUrl,
                        final List<String> interests)
    {
        this.id = id;
        this.name = name;
        this.age = age;
        this.imageUrl = imageUrl;
        this.interests = interests;
    }

    public String getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public Integer getAge()
    {
        return age;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public List<String> getInterests()
    {
        return interests;
    }
}