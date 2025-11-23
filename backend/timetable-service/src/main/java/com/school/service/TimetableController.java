package com.school.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    @GetMapping
    public List<Map<String, String>> getTimetable() {
        return List.of(Map.of("status", "Timetable Service is Running"));
    }
}
