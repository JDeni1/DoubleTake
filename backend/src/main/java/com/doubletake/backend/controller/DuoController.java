package com.doubletake.backend.controller;

import com.doubletake.backend.dto.DuoRequest;
import com.doubletake.backend.entity.Duo;
import com.doubletake.backend.service.DuoService;
import org.springframework.web.bind.annotation.*;
import com.doubletake.backend.dto.DuoResponse;
import com.doubletake.backend.service.DiscoveryService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/duos")
public class DuoController
{
    private final DuoService duoService;
    private final DiscoveryService discoveryService;

    public DuoController(final DuoService duoService,
                         final DiscoveryService discoveryService)
    {
        this.duoService = duoService;
        this.discoveryService = discoveryService;
    }

    /**
     * Creates a new duo using two users sent from the frontend.
     *
     * @param request the duo creation information sent by the frontend
     * @return the created duo
     */
    @PostMapping
    public DuoResponse createDuo(@RequestBody final DuoRequest request)
    {
        return duoService.createDuo(
                request.getUser1Id(),
                request.getUser2Id());
    }

    /**
     * Retrieves a duo using its duo ID.
     *
     * @param duoId the ID of the duo
     * @return the requested duo
     */
    @GetMapping("/{duoId}")
    public DuoResponse getDuo(@PathVariable final String duoId)
    {
        return duoService.getDuoResponse(duoId);
    }

    /**
     * Retrieves eligible duos for the discovery feed.
     *
     * @param duoId the ID of the current duo
     * @return the eligible duos for the feed
     */
    @GetMapping("/{duoId}/feed")
    public List<DuoResponse> getFeed(@PathVariable final String duoId)
    {
        return discoveryService.getEligibleDuoResponses(duoId);
    }

    @PutMapping("/{duoId}")
    public DuoResponse updateDuo(
            @PathVariable final String duoId,
            @RequestBody final Map<String, String> changes)
    {
        return duoService.updateDuo(
                duoId,
                changes.get("duoBio"));
    }

    @GetMapping("/search")
    public List<DuoResponse> searchDuos(
            @RequestParam final String q,
            @RequestParam final String duoId)
    {
        return discoveryService.searchDuoResponses(q, duoId);
    }
}