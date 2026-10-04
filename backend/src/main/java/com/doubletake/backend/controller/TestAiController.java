package com.doubletake.backend.controller;

import com.doubletake.backend.entity.DuoProfile;
import com.doubletake.backend.repository.DuoProfileRepository;
import com.doubletake.backend.service.AiEmbeddingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestAiController {

    private final AiEmbeddingService aiEmbeddingService;
    private final DuoProfileRepository duoProfileRepository;

    public TestAiController(AiEmbeddingService aiEmbeddingService, DuoProfileRepository duoProfileRepository) {
        this.aiEmbeddingService = aiEmbeddingService;
        this.duoProfileRepository = duoProfileRepository;
    }

    // 1. Generate embedding and save to duo_profiles table
    @GetMapping("/embedding")
    public ResponseEntity<String> testEmbedding(
            @RequestParam(defaultValue = "baking pastries and gym workouts") String text,
            @RequestParam(defaultValue = "test-duo-1") String duoId) {
        try {
            // Generate the 384-dim vector string from Cohere
            String vectorString = aiEmbeddingService.generateEmbedding(text);

            // Instantiate your DuoProfile entity using the requested duoId
            DuoProfile profile = new DuoProfile(
                duoId, 
                DuoProfile.LookingFor.DOUBLE_DATE, 
                19, 
                25
            );
            profile.setCombinedVibeText(text);
            profile.setVibeVector(vectorString); 

            // Save to TiDB using your repository
            duoProfileRepository.save(profile);

            return ResponseEntity.ok("✅ Successfully saved vector for Duo ID: " + duoId + 
                                     "\n\nVibe Text: " + text + 
                                     "\nVector Preview: " + vectorString.substring(0, Math.min(80, vectorString.length())) + "...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed: " + e.getMessage());
        }
    }

    // 2. View everything currently saved in duo_profiles
    @GetMapping("/saved-duo-profiles")
    public ResponseEntity<List<DuoProfile>> getAllDuoProfiles() {
        return ResponseEntity.ok(duoProfileRepository.findAll());
    }

    // 3. Test Vector Similarity Search (Find matches based on vector distance)
    @GetMapping("/match")
    public ResponseEntity<?> testMatching(@RequestParam(defaultValue = "test-duo-1") String duoId) {
        try {
            // Find the profile for the requested duo
            DuoProfile currentProfile = duoProfileRepository.findById(duoId)
                    .orElseThrow(() -> new RuntimeException("Duo profile not found for ID: " + duoId));

            if (currentProfile.getVibeVector() == null) {
                return ResponseEntity.badRequest().body("❌ This duo does not have a vibe vector saved yet!");
            }

            // Find top matches using the vector distance query
            List<DuoProfile> matches = duoProfileRepository.findTopMatches(duoId, currentProfile.getVibeVector());

            return ResponseEntity.ok(matches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Matching failed: " + e.getMessage());
        }
    }
}