package com.doubletake.backend.controller;

import com.doubletake.backend.service.AiEmbeddingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestAiController {

    private final AiEmbeddingService aiEmbeddingService;

    public TestAiController(AiEmbeddingService aiEmbeddingService) {
        this.aiEmbeddingService = aiEmbeddingService;
    }

    @GetMapping("/embedding")
    public ResponseEntity<String> testEmbedding(@RequestParam(defaultValue = "baking pastries and gym workouts") String text) {
        try {
            String result = aiEmbeddingService.generateEmbedding(text);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ OpenAI Call Failed: " + e.getMessage());
        }
    }
}