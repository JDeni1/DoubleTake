package com.doubletake.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class AiEmbeddingService {

    private final RestClient restClient;

    @Value("${openai.api.key}")
    private String cohereApiKey;

    public AiEmbeddingService() {
        this.restClient = RestClient.create();
    }

    @SuppressWarnings("unchecked")
    public String generateEmbedding(String combinedVibeText) {
        String cleanKey = cohereApiKey != null ? cohereApiKey.replace("\"", "").trim() : "";

        // Cohere API payload using their lightweight embed model (384 dimensions)
        Map<String, Object> requestBody = Map.of(
                "texts", List.of(combinedVibeText),
                "model", "embed-english-light-v3.0",
                "input_type", "search_document"
        );

        String endpointUrl = "https://api.cohere.com/v1/embed";

        try {
            Map<String, Object> response = restClient.post()
                    .uri(endpointUrl)
                    .header("Authorization", "Bearer " + cleanKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response != null && response.containsKey("embeddings")) {
                List<List<Double>> embeddings = (List<List<Double>>) response.get("embeddings");
                if (embeddings != null && !embeddings.isEmpty()) {
                    List<Double> values = embeddings.get(0);
                    return values.toString(); // Returns formatted vector string [0.0123, -0.0456, ...]
                }
            }
        } catch (RestClientResponseException e) {
            System.err.println("❌ Cohere API Error Status: " + e.getStatusCode());
            System.err.println("❌ Cohere Response Body: " + e.getResponseBodyAsString());
            throw new RuntimeException("Cohere API call failed: " + e.getResponseBodyAsString(), e);
        }

        throw new RuntimeException("Failed to generate embedding from Cohere API");
    }
}