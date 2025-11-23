package com.school.service.listener;

import com.school.service.event.StudentEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class SchoolEventListener {

    @KafkaListener(topics = "student-events", groupId = "school-group")
    public void handleStudentEvent(StudentEvent event) {
        System.out.println("Received Student Event: " + event);
        // Here you can add logic to update school analytics or other side effects
    }
}
