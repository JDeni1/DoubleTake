package com.doubletake.backend.dto;

import java.util.List;

public class UserProfileRequest
{
    private String name;
    private Integer age;
    private String bio;
    private List<String> interests;
    private String imageUrl;

    public String getName()
    {
        return name;
    }

    public void setName(final String name)
    {
        this.name = name;
    }

    public Integer getAge()
    {
        return age;
    }

    public void setAge(final Integer age)
    {
        this.age = age;
    }

    public String getBio()
    {
        return bio;
    }

    public void setBio(final String bio)
    {
        this.bio = bio;
    }

    public List<String> getInterests()
    {
        return interests;
    }

    public void setInterests(final List<String> interests)
    {
        this.interests = interests;
    }

    public String getImageUrl()
    {
        return imageUrl;
    }

    public void setImageUrl(final String imageUrl)
    {
        this.imageUrl = imageUrl;
    }
}