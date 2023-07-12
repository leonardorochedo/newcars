package com.newcars.backend.dtos;

public class EditUserDto {
	
	private String name;
	private String email;
	private String password;
	private String phone;
	private String image;
	
	public EditUserDto(String name, String email, String password, String phone, String image) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.image = image;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}
