package com.doubletake.backend.service;

import java.util.Map;

public class UserProfileService
{
    /**
     * Validates the user's age.
     *
     * @param age user's age
     * @return truen if their age is above 18
     */
    public boolean isValidAge(final Integer age)
    {
        return age >= 18;
    }

    /**
     * Validates user's first name.
     *
     * @param firstName user's first name
     * @return true if first name is not null or blank.
     */
    public boolean isValidFirstname(final String firstName)
    {
        return firstName != null && !firstName.isBlank();
    }

    /**
     * Checks if the user is in a duo.
     *
     * @param duoID duo ID of the duo
     * @return true if it is not null or blank
     */
    public boolean hasDuo(final String duoID)
    {
        return duoID != null && !duoID.isBlank();
    }

    /**
     * checks if the user has a valid bio.
     *
     * @param bio user's bio
     * @return true if its null and has a length under 500
     */
    public boolean isValidBio(final String bio)
    {
        return bio ==  null && bio.length() <= 500;
    }

    /**
     * Checks if the user has valid interests.
     *
     * @param interests user's interests
     * @return true if interests are not null or empty
     */
    public boolean hasInterests(final Map<String, Object> interests)
    {
        return interests != null && !interests.isEmpty();
    }

}
