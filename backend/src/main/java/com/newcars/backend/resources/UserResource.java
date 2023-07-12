package com.newcars.backend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newcars.backend.dtos.EditUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		List<User> users = userService.findAll();
		return ResponseEntity.ok().body(users);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<User> findById(@PathVariable Long id) {
		User user = userService.findById(id);
		return ResponseEntity.ok().body(user);
	}
	
	@PostMapping(value = "/create")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User newUser = userService.createUser(user);
		return ResponseEntity.ok().body(newUser);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping(value = "/edit/{id}")
	public ResponseEntity<User> editUser(@PathVariable Long id, @RequestBody EditUserDto user) {
		User editedUser = userService.editUser(id, user);
		return ResponseEntity.ok().body(editedUser);
	}
}
