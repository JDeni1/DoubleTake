package com.doubletake.backend.dto;

import com.doubletake.backend.entity.DuoProfile;

import java.util.Map;

/**
 * Stores duo profile data sent from the frontend.
 */
public class DuoProfileRequest
{
    private String duoId;
    private DuoProfile.LookingFor lookingFor;
    private Integer minAge;
    private Integer maxAge;
    private Map<String, Object> promptAnswers;
    private String combinedVibeText;

    public String getDuoId()
    {
        return duoId;
    }

    public void setDuoId(final String duoId)
    {
        this.duoId = duoId;
    }

    public DuoProfile.LookingFor getLookingFor()
    {
        return lookingFor;
    }

    public void setLookingFor(final DuoProfile.LookingFor lookingFor)
    {
        this.lookingFor = lookingFor;
    }

    public Integer getMinAge()
    {
        return minAge;
    }

    public void setMinAge(final Integer minAge)
    {
        this.minAge = minAge;
    }

    public Integer getMaxAge()
    {
        return maxAge;
    }

    public void setMaxAge(final Integer maxAge)
    {
        this.maxAge = maxAge;
    }

    public Map<String, Object> getPromptAnswers()
    {
        return promptAnswers;
    }

    public void setPromptAnswers(final Map<String, Object> promptAnswers)
    {
        this.promptAnswers = promptAnswers;
    }

    public String getCombinedVibeText()
    {
        return combinedVibeText;
    }

    public void setCombinedVibeText(final String combinedVibeText)
    {
        this.combinedVibeText = combinedVibeText;
    }
}