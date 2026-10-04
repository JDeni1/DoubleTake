package com.doubletake.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.Map;

@Entity
@Table(name = "duo_profiles")
public class DuoProfile {

    @Id
    @Column(name = "duo_id", length = 36, nullable = false)
    private String duoId; // Primary key, links to the duos table

    @Enumerated(EnumType.STRING)
    @Column(name = "looking_for")
    private LookingFor lookingFor = LookingFor.DOUBLE_DATE;

    @Column(name = "min_age")
    private Integer minAge = 18;

    @Column(name = "max_age")
    private Integer maxAge = 99;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "prompt_answers", columnDefinition = "json")
    private Map<String, Object> promptAnswers;

    @Column(name = "combined_vibe_text", columnDefinition = "TEXT")
    private String combinedVibeText;

    /* Standard JPA doesn't have a native VECTOR type, so we map the vector 
     as a String or handle it via native queries when interacting with TiDB. */
    @Column(name = "vibe_vector", columnDefinition = "VECTOR")
    private String vibeVector;

    // Enum matching your TiDB ENUM definition
    public enum LookingFor {
        DOUBLE_DATE, NEW_FRIENDS, EITHER
    }

    // Constructors
    public DuoProfile() {}

    public DuoProfile(String duoId, LookingFor lookingFor, Integer minAge, Integer maxAge) {
        this.duoId = duoId;
        this.lookingFor = lookingFor;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    // Getters and Setters
    public String getDuoId() {
        return duoId;
    }

    public void setDuoId(String duoId) {
        this.duoId = duoId;
    }

    public LookingFor getLookingFor() {
        return lookingFor;
    }

    public void setLookingFor(LookingFor lookingFor) {
        this.lookingFor = lookingFor;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public Map<String, Object> getPromptAnswers() {
        return promptAnswers;
    }

    public void setPromptAnswers(Map<String, Object> promptAnswers) {
        this.promptAnswers = promptAnswers;
    }

    public String getCombinedVibeText() {
        return combinedVibeText;
    }

    public void setCombinedVibeText(String combinedVibeText) {
        this.combinedVibeText = combinedVibeText;
    }

    public String getVibeVector() {
        return vibeVector;
    }

    public void setVibeVector(String vibeVector) {
        this.vibeVector = vibeVector;
    }
}