package com.doubletake.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test-db")
    public String testDatabaseConnection() {
        try {
            // This runs a simple SQL query to ask the database for the current time
            String currentTime = jdbcTemplate.queryForObject("SELECT NOW()", String.class);
            return "✅ Success! Connected to TiDB. Current database time is: " + currentTime;
        } catch (Exception e) {
            return "❌ Connection failed: " + e.getMessage();
        }
    }
}