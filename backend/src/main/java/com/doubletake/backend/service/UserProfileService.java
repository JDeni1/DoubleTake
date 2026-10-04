package com.doubletake.backend.service;

import com.doubletake.backend.entity.UserProfile;
import com.doubletake.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import com.doubletake.backend.dto.UserResponse;

import java.util.List;

import java.util.Map;

@Service
public class UserProfileService
{
    private final UserProfileRepository userProfileRepository;

    public UserProfileService(final UserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Finds a user profile in the database using the user's ID.
     *
     * @param userId the Supabase user ID associated with the profile
     * @return the user profile if it exists, otherwise null
     */
    public UserProfile getUserProfile(final String userId)
    {
        return userProfileRepository.findById(userId).orElse(null);
    }

    /**
     * Saves a new user profile or updates an existing user profile in the database.
     *
     * @param userProfile the user profile to save
     * @return the saved user profile
     */
    public UserProfile saveUserProfile(final UserProfile userProfile)
    {
        return userProfileRepository.save(userProfile);
    }

    /**
     * Validates the user's age.
     *
     * @param age user's age
     * @return true if their age is not null and is above 18
     */
    public boolean isValidAge(final Integer age)
    {
        return age != null && age >= 18;
    }

    /**
     * Validates user's first name.
     *
     * @param firstName user's first name
     * @return true if first name is not null or blank.
     */
    public boolean isValidFirstName(final String firstName)
    {
        return firstName != null && !firstName.isBlank();
    }

    /**
     * Checks if the user is in a duo.
     *
     * @param duoId duo ID of the duo
     * @return true if it is not null or blank
     */
    public boolean hasDuo(final String duoId)
    {
        return duoId != null && !duoId.isBlank();
    }

    /**
     * checks if the user has a valid bio.
     *
     * @param bio user's bio
     * @return true if its null and has a length under 500
     */
    public boolean isValidBio(final String bio)
    {
        return bio == null || bio.length() <= 500;
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

    /**
     * Retrieves all users in the format expected by the frontend.
     *
     * @return all user responses
     */
    public List<UserResponse> getAllUsers()
    {
        return userProfileRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getUserId(),
                        user.getFirstName(),
                        user.getAge(),
                        null,
                        user.getInterests().keySet().stream().toList()))
                .toList();
    }

}
