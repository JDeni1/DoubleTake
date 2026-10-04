package com.doubletake.backend.controller;

import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.service.DiscoveryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/discovery")
public class DiscoveryController
{
    private final DiscoveryService discoveryService;

    public DiscoveryController(final DiscoveryService discoveryService)
    {
        this.discoveryService = discoveryService;
    }

    /**
     * Retrieves the duo profiles that are eligible to appear
     * in the current duo's discovery feed.
     *
     * @param currentDuoId the ID of the duo using discovery
     * @return a list of eligible duo profiles
     */
    @GetMapping("/{currentDuoId}")
    public List<DuoProfile> getDiscoveryProfiles(
            @PathVariable final String currentDuoId)
    {
        return discoveryService.getEligibleDuoProfiles(currentDuoId);
    }
}
