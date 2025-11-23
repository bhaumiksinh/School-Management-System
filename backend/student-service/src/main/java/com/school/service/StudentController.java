package com.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private org.springframework.kafka.core.KafkaTemplate<String, com.school.student.event.StudentEvent> kafkaTemplate;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
        kafkaTemplate.send("student-events", new com.school.student.event.StudentEvent(savedStudent.getId(),
                savedStudent.getName(), savedStudent.getEmail()));
        return savedStudent;
    }
}
