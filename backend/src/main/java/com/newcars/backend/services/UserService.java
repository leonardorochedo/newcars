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
import com.newcars.backend.responses.ApiTokenResponse;
import com.newcars.backend.utils.JwtUtil;

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
	
	public ApiTokenResponse<User> signin(SigninUserDto user) {
		User userFinded = userRepository.findByEmail(user.getEmail());
		
		// Check data
		if (userFinded == null) {
			throw new ResourceNotFoundException("Usuário não existente!");
		}
		
		if (BCrypt.checkpw(user.getPassword(), userFinded.getPassword())) {
			throw new RuntimeException("E-mail ou senha inválidos!");
		}
		
		String token = JwtUtil.generateToken(user.getEmail());
		
		// Create a response
		ApiTokenResponse<User> response = new ApiTokenResponse<User>("Usuário logado com sucesso!", token, userFinded);
		
		return response;
		
	}
	
	public ApiTokenResponse<User> createUser(User user) {
		// Encyrpt and hash password
	    String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
	    user.setPassword(hashedPassword);
	    
	    User newUser = userRepository.save(user);
		
		// Check data
		if (newUser == null) {
			throw new ResourceNotFoundException("Erro ao criar usuário!");
		}
		
		String token = JwtUtil.generateToken(newUser.getEmail());
		
		ApiTokenResponse<User> response = new ApiTokenResponse<User>("Usuário criado com sucesso!", token, newUser);
		
		return response;
	}
	
	public ApiResponse<User> getUserByToken(String authorizationHeader) {
		// Check token
        String token = authorizationHeader.replace("Bearer ", "");
        
		boolean isValidToken = JwtUtil.validateToken(token);

        if (!isValidToken) {
            throw new RuntimeException("Token inválido!");
        }

        // Get user by email-token
        User user = userRepository.findByEmail(JwtUtil.getEmailFromToken(token));
        
        ApiResponse<User> response = new ApiResponse<User>("Perfil carregado!", user);
		
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
