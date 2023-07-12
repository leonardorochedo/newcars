package com.newcars.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newcars.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	// All methods have been push to our interface
	User findByEmail(String email);
}
