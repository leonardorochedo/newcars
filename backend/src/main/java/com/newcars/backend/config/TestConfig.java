package com.newcars.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.newcars.backend.entities.User;
import com.newcars.backend.entities.Vehicle;
import com.newcars.backend.repositories.UserRepository;
import com.newcars.backend.repositories.VehicleRepository;

@Configuration
@Profile("test") // Test file
public class TestConfig implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VehicleRepository vehicleRepository;

	@Override
	public void run(String... args) throws Exception {
		User u1 = new User(null, "Leonardo Ferreira Rochedo", "leonardo@email.com", "123321", "33981111", "imageurlhere");
		User u2 = new User(null, "Isabela Ariadne", "isabela@email.com", "123321", "33982222", "imageurlhere");
		
		Vehicle v1 = new Vehicle(null, "Parati", "Volkswagen", 1991, 25000.00, "Meu xodó", "Street", Arrays.asList("image1", "image2"), true, u1);
		Vehicle v2 = new Vehicle(null, "Gol", "Volkswagen", 1996, 18000.00, "Gol bolinhaa", "Street", Arrays.asList("image1", "image2"), true, u2);

		userRepository.saveAll(Arrays.asList(u1, u2)); // Save a list of users in testdb when initialize app
		vehicleRepository.saveAll(Arrays.asList(v1, v2));
	}
}