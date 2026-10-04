package com.doubletake.backend.service;

import com.doubletake.backend.entity.Duo;
import com.doubletake.backend.repository.DuoRepository;

import com.doubletake.backend.dto.DuoResponse;
import com.doubletake.backend.dto.UserResponse;
import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.entity.UserProfile;
import com.doubletake.backend.repository.DuoProfileRepository;
import com.doubletake.backend.repository.UserProfileRepository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class DuoService
{
    private final DuoRepository duoRepository;
    private final DuoProfileRepository duoProfileRepository;
    private final UserProfileRepository userProfileRepository;

    public DuoService(final DuoRepository duoRepository,
                      final DuoProfileRepository duoProfileRepository,
                      final UserProfileRepository userProfileRepository)
    {
        this.duoRepository = duoRepository;
        this.duoProfileRepository = duoProfileRepository;
        this.userProfileRepository = userProfileRepository;
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

    /**
     * Creates and saves a new duo.
     *
     * @param userAId the ID of the first user
     * @param userBId the ID of the second user
     * @return the created duo response, or null if the duo cannot be created
     */
    public DuoResponse createDuo(final String userAId,
                                 final String userBId)
    {
        if(!canFormDuo(userAId, userBId))
        {
            return null;
        }

        if(userHasDuo(userAId) || userHasDuo(userBId))
        {
            return null;
        }

        final String duoId = UUID.randomUUID().toString();

        final Duo duo = new Duo(
                duoId,
                userAId,
                userBId);

        duoRepository.save(duo);

        return getDuoResponse(duoId);
    }

    /**
     * Retrieves a duo using its duo ID.
     *
     * @param duoId the ID of the duo
     * @return the duo, or null if no duo exists with the given ID
     */
    public Duo getDuo(final String duoId)
    {
        return duoRepository.findById(duoId).orElse(null);
    }

    /**
     * Retrieves a duo with both user profiles in the format expected
     * by the frontend.
     *
     * @param duoId the ID of the duo
     * @return the formatted duo response, or null if the duo does not exist
     */
    public DuoResponse getDuoResponse(final String duoId)
    {
        final Duo duo = duoRepository.findById(duoId).orElse(null);

        if(duo == null)
        {
            return null;
        }

        final UserProfile userA =
                userProfileRepository.findById(duo.getUser1Id()).orElse(null);

        final UserProfile userB =
                userProfileRepository.findById(duo.getUser2Id()).orElse(null);

        if(userA == null || userB == null)
        {
            return null;
        }

        final UserResponse userAResponse = new UserResponse(
                userA.getUserId(),
                userA.getFirstName(),
                userA.getAge(),
                null,
                userA.getInterests().keySet().stream().toList());

        final UserResponse userBResponse = new UserResponse(
                userB.getUserId(),
                userB.getFirstName(),
                userB.getAge(),
                null,
                userB.getInterests().keySet().stream().toList());

        final DuoProfile duoProfile =
                duoProfileRepository.findById(duoId).orElse(null);

        String duoBio = "";

        if(duoProfile != null &&
                duoProfile.getCombinedVibeText() != null)
        {
            duoBio = duoProfile.getCombinedVibeText();
        }

        return new DuoResponse(
                duo.getDuoId(),
                duoBio,
                List.of(userAResponse, userBResponse));
    }

    /**
     * Updates a duo's bio and returns the updated duo response.
     *
     * @param duoId the ID of the duo
     * @param duoBio the updated duo bio
     * @return the updated duo response, or null if the duo does not exist
     */
    public DuoResponse updateDuo(final String duoId,
                                 final String duoBio)
    {
        final Duo duo = duoRepository.findById(duoId).orElse(null);

        if(duo == null)
        {
            return null;
        }

        DuoProfile duoProfile =
                duoProfileRepository.findById(duoId).orElse(null);

        if(duoProfile == null)
        {
            duoProfile = new DuoProfile();
            duoProfile.setDuoId(duoId);
        }

        duoProfile.setCombinedVibeText(duoBio);

        duoProfileRepository.save(duoProfile);

        return getDuoResponse(duoId);
    }
}
