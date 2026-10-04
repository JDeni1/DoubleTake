package com.doubletake.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "duo_match")
public class DuoMatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "duo_a_id", nullable = false)
    private String duoAId;

    @Column(name = "duo_b_id", nullable = false)
    private String duoBId;

    @Column(name = "matched_at")
    private LocalDateTime matchedAt;

    // Default constructor for Spring Boot
    public DuoMatch() {}

    // Constructor to easily create a new match
    public DuoMatch(String duoAId, String duoBId) {
        this.duoAId = duoAId;
        this.duoBId = duoBId;
        this.matchedAt = LocalDateTime.now(); // Automatically saves the current time
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDuoAId() { return duoAId; }
    public void setDuoAId(String duoAId) { this.duoAId = duoAId; }
    
    public String getDuoBId() { return duoBId; }
    public void setDuoBId(String duoBId) { this.duoBId = duoBId; }
    
    public LocalDateTime getMatchedAt() { return matchedAt; }
    public void setMatchedAt(LocalDateTime matchedAt) { this.matchedAt = matchedAt; }
}