package com.newcars.backend.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newcars.backend.dtos.EditUserDto;
import com.newcars.backend.dtos.SigninUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.exceptions.ResourceNotFoundException;
import com.newcars.backend.repositories.UserRepository;
import com.newcars.backend.responses.ApiResponse;

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
	
	public ApiResponse<User> signin(SigninUserDto user) {
		User userFinded = userRepository.findByEmail(user.getEmail());
		
		// Check data
		if (userFinded == null) {
			throw new ResourceNotFoundException("Usuário não existente!");
		}
		
		if (BCrypt.checkpw(user.getPassword(), userFinded.getPassword())) {
			throw new RuntimeException("E-mail ou senha inválidos!");
		}
		
		// Create a response
		ApiResponse<User> response = new ApiResponse<User>("Usuário logado com sucesso!", userFinded);
		
		return response;
		
	}
	
	public ApiResponse<User> createUser(User user) {
		// Encyrpt and hash password
	    String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
	    user.setPassword(hashedPassword);
	    
	    User newUser = userRepository.save(user);
		
		// Check data
		if (newUser == null) {
			throw new ResourceNotFoundException("Erro ao criar usuário!");
		}
		
		ApiResponse<User> response = new ApiResponse<User>("Usuário criado com sucesso!", newUser);
		
		return response;
	}
	
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
		
		return;
	}
	
	public ApiResponse<User> editUser(Long id, EditUserDto user) {
		User editedUser = userRepository.findById(id).get();
		
		// Update user with new data
		editedUser.setName(user.getName());
		editedUser.setEmail(user.getEmail());
		editedUser.setPassword(user.getPassword());
		editedUser.setPhone(user.getPhone());
		editedUser.setImage(user.getImage());
		
		// Save data in db
		userRepository.save(editedUser);
		
		ApiResponse<User> response = new ApiResponse<User>("Usuário editado com sucesso!", editedUser);
		
		return response;
	}
}
