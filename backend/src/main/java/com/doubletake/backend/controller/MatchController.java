package com.doubletake.backend.controller;

import com.doubletake.backend.entity.DuoMatch;
import com.doubletake.backend.service.MatchService;
import org.springframework.web.bind.annotation.*;
import com.doubletake.backend.dto.MatchResponse;

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

    @GetMapping("/{duoId}")
    public List<MatchResponse> getMatchesForDuo(
            @PathVariable final String duoId)
    {
        return matchService.getMatchResponses(duoId);
    }
}