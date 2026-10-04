package com.doubletake.backend.controller;

import com.doubletake.backend.dto.SwipeRequest;
import com.doubletake.backend.entity.DuoMatch;
import com.doubletake.backend.service.SwipeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/swipes")
public class SwipeController
{
    private final SwipeService swipeService;

    public SwipeController(final SwipeService swipeService)
    {
        this.swipeService = swipeService;
    }

    /**
     * Processes a swipe sent from the frontend.
     *
     * @param request the swipe information sent by the frontend
     * @return the created match if the swipe results in a mutual like,
     *         otherwise null
     */
    @PostMapping
    public DuoMatch processSwipe(@RequestBody final SwipeRequest request)
    {
        return swipeService.processSwipe(
                request.getCurrentDuoId(),
                request.getTargetDuoId(),
                request.getSwipeDirection());
    }
}