package com.doubletake.backend.controller;

import com.doubletake.backend.dto.UserProfileRequest;
import com.doubletake.backend.entity.UserProfile;
import com.doubletake.backend.service.UserProfileService;
import org.springframework.web.bind.annotation.*;
import com.doubletake.backend.dto.UserResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserProfileController
{
    private final UserProfileService userProfileService;

    public UserProfileController(final UserProfileService userProfileService)
    {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public UserResponse saveUserProfile(
            @RequestBody final UserProfileRequest request)
    {
        final String userId = UUID.randomUUID().toString();

        final UserProfile userProfile = new UserProfile(
                userId,
                request.getName(),
                request.getAge());

        userProfile.setBio(request.getBio());

        final Map<String, Object> interests = new HashMap<>();

        for(final String interest : request.getInterests())
        {
            interests.put(interest, true);
        }

        userProfile.setInterests(interests);

        final UserProfile savedUser =
                userProfileService.saveUserProfile(userProfile);

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getFirstName(),
                savedUser.getAge(),
                null,
                request.getInterests());
    }

    /**
     * Retrieves a user profile using the user's ID.
     *
     * @param userId the Supabase user ID associated with the profile
     * @return the user profile if it exists, otherwise null
     */
    @GetMapping("/{userId}")
    public UserProfile getUserProfile(@PathVariable final String userId)
    {
        return userProfileService.getUserProfile(userId);
    }

    /**
     * Retrieves all users.
     *
     * @return all users in the format expected by the frontend
     */
    @GetMapping
    public List<UserResponse> getUsers()
    {
        return userProfileService.getAllUsers();
    }
}
