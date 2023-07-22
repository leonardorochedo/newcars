package com.newcars.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.newcars.backend.dtos.CreateUserDto;
import com.newcars.backend.dtos.SigninUserDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.exceptions.ResourceNotFoundException;
import com.newcars.backend.repositories.UserRepository;
import com.newcars.backend.responses.ApiTokenResponse;

@SpringBootTest
@ActiveProfiles("test") // Run in test file
public class UserServiceTest {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void testFindById() {
		// Arrange
		User mockUser = new User(null, "Leonardo Ferreira Rochedo", "leonardo@email.com", "123321", "33981111", null);
		userRepository.save(mockUser);
		
		// Act
		User response = userService.findById(1L);
		
		// Assert
		assertNotNull(response);
		assertEquals(1, response.getId());
		assertEquals("leonardo@email.com", response.getEmail());
	}
	
	@Test
	public void testSignoutWithInvalidPasswords() {
        assertThrows(IllegalArgumentException.class, () -> userService.signout(new CreateUserDto("Leonardo Ferreira Rochedo", "leonardo@email.com", "123321", "123", "33981111")));
	}
	
	@Test
	public void testSignout() {
		CreateUserDto createUser = new CreateUserDto("Fulano Teste", "fulano@email.com", "123321", "123321", "33981111");
		
		ApiTokenResponse<User> response = userService.signout(createUser);
		
		assertNotNull(response);
		assertEquals("Usuário criado com sucesso!", response.getMessage());
		assertEquals("fulano@email.com", response.getData().getEmail());
	}
	
	@Test
	public void testSigninWithInvalidPassword() {
		CreateUserDto createUser = new CreateUserDto("Isabela Ariadne", "isabela@email.com", "123321", "123321", "33981111");
		
		ApiTokenResponse<User> createResponse = userService.signout(createUser);
		
		assertNotNull(createResponse);
		assertThrows(IllegalArgumentException.class, () -> userService.signin(new SigninUserDto("isabela@email.com", "123")));
	}
	
	@Test
	public void testSigninWithNonExistentEmail() {
        assertThrows(ResourceNotFoundException.class, () -> userService.signin(new SigninUserDto("leonardo@email.com.br", "123321")));
	}

}
