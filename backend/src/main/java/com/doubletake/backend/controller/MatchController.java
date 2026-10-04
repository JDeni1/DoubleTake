package com.doubletake.backend.controller;

import com.doubletake.backend.entity.DuoMatch;
import com.doubletake.backend.service.MatchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController
{
    private final MatchService matchService;

    public MatchController(final MatchService matchService)
    {
        this.matchService = matchService;
    }

    /**
     * Retrieves all matches involving the specified duo.
     *
     * @param duoId the ID of the duo whose matches are being retrieved
     * @return a list of matches involving the duo
     */
    @GetMapping("/{duoId}")
    public List<DuoMatch> getMatchesForDuo(
            @PathVariable final String duoId)
    {
        return matchService.getMatchesForDuo(duoId);
    }
}