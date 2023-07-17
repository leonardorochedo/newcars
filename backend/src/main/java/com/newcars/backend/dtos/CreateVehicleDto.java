package com.newcars.backend.dtos;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class CreateVehicleDto {

	private String model;
	private String manufacturer;
	private Integer year_number;
	private Double price;
	private String description;
	private String category;
    private List<MultipartFile> images;
    
	public CreateVehicleDto(String model, String manufacturer, Integer year_number, Double price,
			String description, String category, List<MultipartFile> images) {
		super();
		this.model = model;
		this.manufacturer = manufacturer;
		this.year_number = year_number;
		this.price = price;
		this.description = description;
		this.category = category;
		this.images = images;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Integer getYear_number() {
		return year_number;
	}

	public void setYear_number(Integer year_number) {
		this.year_number = year_number;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<MultipartFile> getImages() {
		return images;
	}

	public void setImages(List<MultipartFile> images) {
		this.images = images;
	}
    
}
