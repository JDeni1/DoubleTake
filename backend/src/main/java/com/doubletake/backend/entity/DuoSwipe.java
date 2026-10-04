package com.doubletake.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "duo_swipes")
public class DuoSwipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "swipe_id")
    private Long swipeId;

    @Column(name = "swiper_duo_id", length = 36, nullable = false)
    private String swiperDuoId;

    @Column(name = "target_duo_id", length = 36, nullable = false)
    private String targetDuoId;

    @Enumerated(EnumType.STRING)
    @Column(name = "swipe_direction", nullable = false)
    private SwipeDirection swipeDirection;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum SwipeDirection {
        LIKE, PASS
    }

    // Constructors
    public DuoSwipe() {}

    public DuoSwipe(String swiperDuoId, String targetDuoId, SwipeDirection swipeDirection) {
        this.swiperDuoId = swiperDuoId;
        this.targetDuoId = targetDuoId;
        this.swipeDirection = swipeDirection;
    }

    // Getters and Setters
    public Long getSwipeId() {
        return swipeId;
    }

    public void setSwipeId(Long swipeId) {
        this.swipeId = swipeId;
    }

    public String getSwiperDuoId() {
        return swiperDuoId;
    }

    public void setSwiperDuoId(String swiperDuoId) {
        this.swiperDuoId = swiperDuoId;
    }

    public String getTargetDuoId() {
        return targetDuoId;
    }

    public void setTargetDuoId(String targetDuoId) {
        this.targetDuoId = targetDuoId;
    }

    public SwipeDirection getSwipeDirection() {
        return swipeDirection;
    }

    public void setSwipeDirection(SwipeDirection swipeDirection) {
        this.swipeDirection = swipeDirection;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}