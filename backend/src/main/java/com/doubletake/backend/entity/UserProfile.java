package com.doubletake.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.Map;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @Column(name = "user_id", length = 36, nullable = false)
    private String userId; // Maps to Supabase UUID

    @Column(name = "duo_id", length = 36)
    private String duoId; // Foreign key linking to the duos table

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    // Mapping the JSON interests column to a Java Map or List
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "interests", columnDefinition = "json")
    private Map<String, Object> interests;

    // Constructors
    public UserProfile() {}

    public UserProfile(String userId, String firstName, Integer age) {
        this.userId = userId;
        this.firstName = firstName;
        this.age = age;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDuoId() {
        return duoId;
    }

    public void setDuoId(String duoId) {
        this.duoId = duoId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Map<String, Object> getInterests() {
        return interests;
    }

    public void setInterests(Map<String, Object> interests) {
        this.interests = interests;
    }
}
