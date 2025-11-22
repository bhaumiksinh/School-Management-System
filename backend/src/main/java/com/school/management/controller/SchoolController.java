package com.school.management.controller;

import com.school.management.model.School;
import com.school.management.repository.SchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/school")
@CrossOrigin(origins = "http://localhost:5173")
public class SchoolController {

    @Autowired
    private SchoolRepository schoolRepository;

    @GetMapping
    public School getSchool() {
        List<School> schools = schoolRepository.findAll();
        if (schools.isEmpty()) {
            School defaultSchool = new School();
            defaultSchool.setName("Springfield High School");
            defaultSchool.setAddress("742 Evergreen Terrace");
            defaultSchool.setPrincipal("Seymour Skinner");
            defaultSchool.setContact("555-0113");
            return schoolRepository.save(defaultSchool);
        }
        return schools.get(0);
    }

    @PostMapping
    public School updateSchool(@RequestBody School school) {
        schoolRepository.deleteAll();
        return schoolRepository.save(school);
    }
}
