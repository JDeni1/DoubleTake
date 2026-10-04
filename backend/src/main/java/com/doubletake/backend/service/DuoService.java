package com.doubletake.backend.service;

import com.doubletake.backend.repository.DuoRepository;

import org.springframework.stereotype.Service;

@Service
public class DuoService
{
    private final DuoRepository duoRepository;

    public DuoService(final DuoRepository duoRepository)
    {
        this.duoRepository = duoRepository;
    }
    /**
     * Checks wether two different users can form a duo
     *
     * @param userAId the ID of the first user
     * @param userBId the ID of the second user
     * @return ture if the users are different, false if they're the same
     */
    public boolean canFormDuo(final String userAId,
                              final String userBId)
    {
        return !userAId.equals(userBId);
    }

    /**
     * Checks wether two duo IDs refer to the same duo.
     *
     * @param duoAId the ID of the first duo
     * @param duoBId the ID of the second duo
     * @return true if both IDs elong to the same duo, false otherwise
     */
    public boolean isSameDuo(final String duoAId,
                             final String duoBId)
    {
        return duoAId.equals(duoBId);
    }

    /**
     * Checks whether a user already belongs to a duo.
     *
     * @param userId the ID of the user to check
     * @return true if the user is already part of a duo, false otherwise
     */
    public boolean userHasDuo(final String userId)
    {
        return duoRepository.findByUser1IdOrUser2Id(userId, userId).isPresent();
    }
}
