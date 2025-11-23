package com.school.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fees")
public class FeeController {

    @GetMapping
    public List<Map<String, String>> getAllFees() {
        return List.of(Map.of("status", "Fee Service is Running"));
    }
}
