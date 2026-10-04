package com.doubletake.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "duos")
public class Duo {

    @Id
    @Column(name = "duo_id", length = 36, nullable = false)
    private String duoId;

    @Column(name = "user1_id", length = 36, nullable = false)
    private String user1Id;

    @Column(name = "user2_id", length = 36, nullable = false)
    private String user2Id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DuoStatus status = DuoStatus.PENDING;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum DuoStatus {
        PENDING, ACTIVE, DISBANDED
    }

    // Constructors
    public Duo() {}

    public Duo(String duoId, String user1Id, String user2Id) {
        this.duoId = duoId;
        this.user1Id = user1Id;
        this.user2Id = user2Id;
    }

    // Getters and Setters
    public String getDuoId() {
        return duoId;
    }

    public void setDuoId(String duoId) {
        this.duoId = duoId;
    }

    public String getUser1Id() {
        return user1Id;
    }

    public void setUser1Id(String user1Id) {
        this.user1Id = user1Id;
    }

    public String getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(String user2Id) {
        this.user2Id = user2Id;
    }

    public DuoStatus getStatus() {
        return status;
    }

    public void setStatus(DuoStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}