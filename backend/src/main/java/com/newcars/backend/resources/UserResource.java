package com.newcars.backend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newcars.backend.dtos.EditUserDto;
import com.newcars.backend.dtos.SigninUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.exceptions.ResourceNotFoundException;
import com.newcars.backend.responses.ApiResponse;
import com.newcars.backend.responses.ApiTokenResponse;
import com.newcars.backend.responses.ErrorResponse;
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
	
	@PostMapping(value = "/signin")
	public ResponseEntity<?> signin(@RequestBody SigninUserDto user) {
		try {
			ApiTokenResponse<User> response = userService.signin(user);
	        
	        return ResponseEntity.ok().body(response);
	    } catch (ResourceNotFoundException e) {
	        ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	        
	        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(errorResponse);
	    } catch (RuntimeException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(errorResponse);
	    }
	}
	
	@PostMapping(value = "/signout")
	public ResponseEntity<?> signout(@RequestBody User user) {
		try {			
			ApiTokenResponse<User> response = userService.createUser(user);
			
			return ResponseEntity.ok().body(response);
		} catch (ResourceNotFoundException e) {
	        ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	        
	        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(errorResponse);
	    }
	}
	
	@GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
		try {
			ApiResponse<User> response = userService.getUserByToken(authorizationHeader);
			
			return ResponseEntity.ok().body(response);
		} catch (RuntimeException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(errorResponse);
	    }
    }
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@PatchMapping(value = "/edit/{id}")
	public ResponseEntity<?> editUser(@PathVariable Long id, @RequestBody EditUserDto user) {
		ApiResponse<User> response = userService.editUser(id, user);
			
		return ResponseEntity.ok().body(response);
	}
}
