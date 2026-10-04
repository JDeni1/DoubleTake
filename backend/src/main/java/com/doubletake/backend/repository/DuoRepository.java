package com.doubletake.backend.repository;

import com.doubletake.backend.entity.Duo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DuoRepository extends JpaRepository<Duo, String> {
    
    // Optional custom query to find a duo by one of the user IDs
    Optional<Duo> findByUser1IdOrUser2Id(String user1Id, String user2Id);
}