package com.doubletake.backend.controller;

import com.doubletake.backend.dto.UserProfileRequest;
import com.doubletake.backend.entity.UserProfile;
import com.doubletake.backend.service.UserProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserProfileController
{
    private final UserProfileService userProfileService;

    public UserProfileController(final UserProfileService userProfileService)
    {
        this.userProfileService = userProfileService;
    }

    /**
     * Creates or updates a user profile using data sent from the frontend.
     *
     * @param request the user profile data sent by the frontend
     * @return the saved user profile
     */
    @PostMapping
    public UserProfile saveUserProfile(
            @RequestBody final UserProfileRequest request)
    {
        final UserProfile userProfile = new UserProfile(
                request.getUserId(),
                request.getFirstName(),
                request.getAge());

        userProfile.setBio(request.getBio());
        userProfile.setInterests(request.getInterests());

        return userProfileService.saveUserProfile(userProfile);
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
}
