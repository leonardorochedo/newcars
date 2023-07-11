package com.newcars.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.newcars.backend.entities.User;
import com.newcars.backend.repositories.UserRepository;

@Configuration
@Profile("test") // Test file
public class TestConfig implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		User u1 = new User(null, "Leonardo Ferreira Rochedo", "leonardo@email.com", "123321", "33981111", "");
		User u2 = new User(null, "Isabela Ariadne", "isabela@email.com", "123321", "33982222", "");
		
		System.out.println(u1);
		System.out.println(u2);

		userRepository.saveAll(Arrays.asList(u1, u2)); // Save a list of users in testdb when initialize app
	}
}