package com.doubletake.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{
    /**
     * Allows the React frontend to communicate with backend API endpoints.
     *
     * @param registry the CORS registry used to configure allowed requests
     */
    @Override
    public void addCorsMappings(final CorsRegistry registry)
    {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}