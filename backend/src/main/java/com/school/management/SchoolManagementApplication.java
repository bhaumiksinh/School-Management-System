package com.school.management;

import com.school.management.model.School;
import com.school.management.repository.SchoolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SchoolManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(SchoolRepository repository) {
		return (args) -> {
			if (repository.count() == 0) {
				School defaultSchool = new School();
				defaultSchool.setName("Springfield High School");
				defaultSchool.setAddress("742 Evergreen Terrace");
				defaultSchool.setPrincipal("Seymour Skinner");
				defaultSchool.setContact("555-0113");
				repository.save(defaultSchool);
			}
		};
	}
}
