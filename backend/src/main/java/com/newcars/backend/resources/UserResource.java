package com.newcars.backend.resources;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.newcars.backend.dtos.CreateUserDto;
import com.newcars.backend.dtos.EditUserDto;
import com.newcars.backend.dtos.SigninUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.exceptions.ResourceNotFoundException;
import com.newcars.backend.responses.ApiResponse;
import com.newcars.backend.responses.ApiTokenResponse;
import com.newcars.backend.responses.ErrorResponse;
import com.newcars.backend.responses.TextResponse;
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
	public ResponseEntity<?> signout(@RequestBody CreateUserDto user) {
		try {			
			ApiTokenResponse<User> response = userService.signout(user);
			
			return ResponseEntity.ok().body(response);
		} catch (ResourceNotFoundException e) {
	        ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	        
	        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(errorResponse);
	    } catch (IllegalArgumentException e) {
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
	public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) throws IOException {
		try {
			TextResponse reponse = userService.deleteUser(authorizationHeader, id);
			
			return ResponseEntity.ok().body(reponse);
		} catch (RuntimeException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(errorResponse);
	    } catch (IOException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(errorResponse);
	    }
	}
	
	@PatchMapping(value = "/edit/{id}")
	public ResponseEntity<?> editUser(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id, @ModelAttribute EditUserDto user, MultipartFile image) throws IOException, IllegalArgumentException {
		// @ModelAttribute to accept multiform/form-data
		try {
			ApiResponse<User> response = userService.editUser(authorizationHeader, id, user, image);
			
			return ResponseEntity.ok().body(response);
		} catch (RuntimeException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(errorResponse);
	    } catch (IOException e) {
	    	ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
	    	
	        return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(errorResponse);
	    }
	}
}
