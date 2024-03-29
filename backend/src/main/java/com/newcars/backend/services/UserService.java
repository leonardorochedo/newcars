package com.newcars.backend.services;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newcars.backend.dtos.CreateUserDto;
import com.newcars.backend.dtos.EditUserDto;
import com.newcars.backend.dtos.SigninUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.exceptions.ExistUserException;
import com.newcars.backend.exceptions.ResourceNotFoundException;
import com.newcars.backend.repositories.UserRepository;
import com.newcars.backend.responses.ApiResponse;
import com.newcars.backend.responses.ApiTokenResponse;
import com.newcars.backend.responses.TextResponse;
import com.newcars.backend.utils.JwtUtil;

import io.jsonwebtoken.io.IOException;

@Service
public class UserService {
	
	@Autowired // DI
	private UserRepository userRepository;
	
	@Value("${image.user.upload.directory}")
	private String imageUploadDirectory;
	
	public List<User> findAll() {
		List<User> users = userRepository.findAll();
		
		return users;
	}
	
	public User findById(Long id) {
		Optional<User> user = userRepository.findById(id); // Optional return a user or a null object
		
		return user.get();
	}
	
	public ApiTokenResponse<User> signin(SigninUserDto user) {
		User userFinded = userRepository.findByEmail(user.getEmail());
		
		// Check data
		if (userFinded == null) {
			throw new ResourceNotFoundException("Usuário não existente!");
		}
		
		if (!BCrypt.checkpw(user.getPassword(), userFinded.getPassword())) {
			throw new IllegalArgumentException("E-mail ou senha inválidos!");
		}
		
		String token = JwtUtil.generateToken(user.getEmail());
		
		// Create a response
		ApiTokenResponse<User> response = new ApiTokenResponse<User>("Usuário logado com sucesso!", token, userFinded);
		
		return response;
	}
	
	public ApiTokenResponse<User> signout(CreateUserDto user) {
		User userFinded = userRepository.findByEmail(user.getEmail());
		
		// Check data
		if (userFinded != null) {
			throw new ExistUserException("Usuário existente!");
		}
		
	    if (user.getName() == null || user.getEmail() == null || user.getPassword() == null || user.getConfirmpassword() == null || user.getPhone() == null) {
		    throw new IllegalArgumentException("Um ou mais campos obrigatórios não estão preenchidos!");
		}
	    
		if (!user.getPassword().equals(user.getConfirmpassword())) {
			throw new IllegalArgumentException("As senhas não batem!");
		}
	    
		// Encyrpt and hash password
		String fixedSalt = "$2a$12$BQfBVhn6AyUbA1QljSUnU.";
	    String hashedPassword = BCrypt.hashpw(user.getPassword(), fixedSalt);
	    user.setPassword(hashedPassword);
		
	    // Storage
	    User newUser = userRepository.save(new User(null, user.getName(), user.getEmail(), user.getPassword(), user.getPhone(), null));
		
		String token = JwtUtil.generateToken(newUser.getEmail());
		
		ApiTokenResponse<User> response = new ApiTokenResponse<User>("Usuário criado com sucesso!", token, newUser);
		
		return response;
	}
	
	public ApiResponse<User> getUserByToken(String authorizationHeader) {
		// Check token
		String token = JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);

        // Get user by email-token
        User user = userRepository.findByEmail(JwtUtil.getEmailFromToken(token));
        
        ApiResponse<User> response = new ApiResponse<User>("Perfil carregado!", user);
		
		return response;
	}
	
	public TextResponse deleteUser(String authorizationHeader, Long id) throws java.io.IOException {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		User user = userRepository.findById(id).get();
		
		// Remove image if exist
		String imageName = user.getImage();
		
		if (imageName != null) {
			try {
				Files.deleteIfExists(Paths.get(imageUploadDirectory, imageName));
			} catch (IOException e) {
				throw new IOException("Arquivo já existente!");
			}			
		}
		
		userRepository.deleteById(id);
		
		TextResponse response = new TextResponse("Usuário deletado com suceso!");
		
		return response;
	}
	
	public ApiResponse<User> editUser(String authorizationHeader, Long id, EditUserDto user, MultipartFile image) throws java.io.IOException {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		User editedUser = userRepository.findById(id).get();
		
		// Verify new data
		if (user.getName() == null || user.getEmail() == null || user.getPassword() == null || user.getConfirmpassword() == null || user.getPhone() == null) {
		    throw new IllegalArgumentException("Um ou mais campos obrigatórios não estão preenchidos!");
		}
		
		if (!user.getPassword().equals(user.getConfirmpassword())) {
			throw new IllegalArgumentException("As senhas não batem!");
		}
		
		// Remove image if exist
		String imageName = editedUser.getImage();
		
		if (imageName != null) {
			try {
				Files.deleteIfExists(Paths.get(imageUploadDirectory, imageName));
			} catch (IOException e) {
				throw new IOException("Arquivo já existente!");
			}			
		}
		
		// Hash password
		String fixedSalt = "$2a$12$BQfBVhn6AyUbA1QljSUnU.";
	    String hashedPassword = BCrypt.hashpw(user.getPassword(), fixedSalt);
		
		// Update user with new data
		editedUser.setName(user.getName());
		editedUser.setEmail(user.getEmail());
		editedUser.setPassword(hashedPassword);
		editedUser.setPhone(user.getPhone());
		
		// Image upload
		String filename = String.valueOf(editedUser.getId());
		String path = Paths.get(imageUploadDirectory, filename).toString();
		    
	    try {
	        Files.copy(image.getInputStream(), Paths.get(path)); // save in dir/images
	    } catch (IOException e) {
	        throw new IOException("Arquivo não suportado!");
	    }
	    
	    editedUser.setImage(filename);
		
		// Save data in db
		userRepository.save(editedUser);
		
		ApiResponse<User> response = new ApiResponse<User>("Usuário editado com sucesso!", editedUser);
		
		return response;
	}
	
}
