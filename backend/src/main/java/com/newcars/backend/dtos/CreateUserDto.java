package com.newcars.backend.dtos;

public class CreateUserDto {

	private String name;
	private String email;
	private String password;
	private String confirmpassword;
	private String phone;
	
	public CreateUserDto(String name, String email, String password, String confirmpassword, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.confirmpassword = confirmpassword;
		this.phone = phone;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getConfirmpassword() {
		return confirmpassword;
	}

	public void setConfirmpassword(String confirmpassword) {
		this.confirmpassword = confirmpassword;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
