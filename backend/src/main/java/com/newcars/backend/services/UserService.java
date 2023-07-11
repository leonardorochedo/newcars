package com.newcars.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newcars.backend.entities.User;
import com.newcars.backend.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired // DI
	private UserRepository userRepository;
	
	public User findById(Long id) {
		Optional<User> user = userRepository.findById(id); // Optional return a user or a null object
		return user.get();
	}
	
	public List<User> findAll() {
		List<User> users = userRepository.findAll();
		return users;
	}
	
	public User createUser(User user) {
		User newUser = userRepository.save(user);
		return newUser;
	}
}