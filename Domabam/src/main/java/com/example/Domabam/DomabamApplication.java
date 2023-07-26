package com.example.Domabam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DomabamApplication {

	public static void main(String[] args) {
		SpringApplication.run(DomabamApplication.class, args);
	}

}
