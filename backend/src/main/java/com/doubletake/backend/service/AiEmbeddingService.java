package com.doubletake.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AiEmbeddingService {

    private final RestClient restClient;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public AiEmbeddingService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.openai.com/v1")
                .build();
    }

    /**
     * Generates a 1536-dimensional vector from text using OpenAI
     * and returns it as a formatted String ready for TiDB.
     */
    @SuppressWarnings("unchecked")
    public String generateEmbedding(String combinedVibeText) {
        Map<String, Object> requestBody = Map.of(
                "model", "text-embedding-3-small",
                "input", combinedVibeText
        );

        Map<String, Object> response = restClient.post()
                .uri("/embeddings")
                .header("Authorization", "Bearer " + openAiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Map.class);

        if (response != null && response.containsKey("data")) {
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");
            if (!data.isEmpty()) {
                List<Double> embedding = (List<Double>) data.get(0).get("embedding");
                return embedding.toString(); // Returns "[0.012, -0.045, ...]" directly!
            }
        }

        throw new RuntimeException("Failed to generate embedding from OpenAI API");
    }
}