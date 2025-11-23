package com.school.gateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/school")
    public Map<String, String> schoolFallback() {
        return Map.of("message", "School Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/teacher")
    public Map<String, String> teacherFallback() {
        return Map.of("message", "Teacher Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/class")
    public Map<String, String> classFallback() {
        return Map.of("message", "Class Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/student")
    public Map<String, String> studentFallback() {
        return Map.of("message", "Student Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/attendance")
    public Map<String, String> attendanceFallback() {
        return Map.of("message", "Attendance Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/exam")
    public Map<String, String> examFallback() {
        return Map.of("message", "Exam Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/library")
    public Map<String, String> libraryFallback() {
        return Map.of("message", "Library Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/fee")
    public Map<String, String> feeFallback() {
        return Map.of("message", "Fee Service is currently unavailable. Please try again later.");
    }

    @GetMapping("/timetable")
    public Map<String, String> timetableFallback() {
        return Map.of("message", "Timetable Service is currently unavailable. Please try again later.");
    }
}
