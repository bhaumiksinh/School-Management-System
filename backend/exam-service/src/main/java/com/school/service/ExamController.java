package com.school.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @GetMapping
    public List<Map<String, String>> getAllExams() {
        return List.of(Map.of("status", "Exam Service is Running"));
    }
}
