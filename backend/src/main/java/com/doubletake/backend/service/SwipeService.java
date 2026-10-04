package com.doubletake.backend.service;

public class SwipeService
{
    /**
     * If the person swiped to liked
     *
     * @param liked
     * @return liked
     */
    public boolean isLike(final boolean liked)
    {
        return liked;
    }

    /**
     * If the person swiped to a pass
     *
     * @param liked
     * @return passed
     */
    public boolean isPass(final boolean liked)
    {
        return !liked;
    }

    /**
     * If the program should even check for a liked or !liked
     * @param liked
     * @return
     */
    public boolean shouldCheckForMatch(final boolean liked)
    {
        return liked;
    }


}
