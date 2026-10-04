package com.doubletake.backend.dto;

import java.util.Map;

/**
 * Stores user profile data sent from the frontend.
 */
public class UserProfileRequest
{
    private String userId;
    private String firstName;
    private Integer age;
    private String bio;
    private Map<String, Object> interests;

    public String getUserId()
    {
        return userId;
    }

    public void setUserId(final String userId)
    {
        this.userId = userId;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(final String firstName)
    {
        this.firstName = firstName;
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

    public Map<String, Object> getInterests()
    {
        return interests;
    }

    public void setInterests(final Map<String, Object> interests)
    {
        this.interests = interests;
    }
}