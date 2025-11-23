package com.school.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @GetMapping
    public List<Map<String, String>> getAllAttendance() {
        return List.of(Map.of("status", "Attendance Service is Running"));
    }
}
