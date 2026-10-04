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
     * Generates a 1536-dimensional vector from the combined vibe text using OpenAI.
     */
    public List<Double> generateEmbedding(String combinedVibeText) {
        Map<String, Object> requestBody = Map.of(
                "model", "text-embedding-3-small",
                "input", combinedVibeText
        );

        // Call OpenAI Embeddings API
        Map<String, Object> response = restClient.post()
                .uri("/embeddings")
                .header("Authorization", "Bearer " + openAiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(Map.class);

        // Parse the vector array out of the JSON response
        if (response != null && response.containsKey("data")) {
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");
            if (!data.isEmpty()) {
                return (List<Double>) data.get(0).get("embedding");
            }
        }

        throw new RuntimeException("Failed to generate embedding from OpenAI API");
    }
}