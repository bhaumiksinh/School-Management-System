package com.school.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    @GetMapping
    public List<Map<String, String>> getAllBooks() {
        return List.of(Map.of("status", "Library Service is Running"));
    }
}
