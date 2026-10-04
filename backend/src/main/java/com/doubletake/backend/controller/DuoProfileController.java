package com.doubletake.backend.controller;

import com.doubletake.backend.dto.DuoProfileRequest;
import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.service.DuoProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/duo-profiles")
public class DuoProfileController
{
    private final DuoProfileService duoProfileService;

    public DuoProfileController(final DuoProfileService duoProfileService)
    {
        this.duoProfileService = duoProfileService;
    }

    /**
     * Retrieves a duo profile using the duo's ID.
     *
     * @param duoId the ID of the duo
     * @return the duo profile if it exists, otherwise null
     */
    @GetMapping("/{duoId}")
    public DuoProfile getDuoProfile(@PathVariable final String duoId)
    {
        return duoProfileService.getDuoProfile(duoId);
    }

    /**
     * Creates or updates a duo profile using data sent from the frontend.
     *
     * @param request the duo profile data sent by the frontend
     * @return the saved duo profile
     */
    @PostMapping
    public DuoProfile saveDuoProfile(
            @RequestBody final DuoProfileRequest request)
    {
        final DuoProfile duoProfile = new DuoProfile(
                request.getDuoId(),
                request.getLookingFor(),
                request.getMinAge(),
                request.getMaxAge());

        duoProfile.setPromptAnswers(request.getPromptAnswers());
        duoProfile.setCombinedVibeText(request.getCombinedVibeText());

        return duoProfileService.saveDuoProfile(duoProfile);
    }
}