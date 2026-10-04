package com.doubletake.backend.dto;

import com.doubletake.backend.entity.DuoSwipe;

/**
 * Stores the data sent by the frontend when a duo performs a swipe.
 */
public class SwipeRequest
{
    private String currentDuoId;
    private String targetDuoId;
    private DuoSwipe.SwipeDirection swipeDirection;

    public String getCurrentDuoId()
    {
        return currentDuoId;
    }

    public void setCurrentDuoId(final String currentDuoId)
    {
        this.currentDuoId = currentDuoId;
    }

    public String getTargetDuoId()
    {
        return targetDuoId;
    }

    public void setTargetDuoId(final String targetDuoId)
    {
        this.targetDuoId = targetDuoId;
    }

    public DuoSwipe.SwipeDirection getSwipeDirection()
    {
        return swipeDirection;
    }

    public void setSwipeDirection(
            final DuoSwipe.SwipeDirection swipeDirection)
    {
        this.swipeDirection = swipeDirection;
    }
}
