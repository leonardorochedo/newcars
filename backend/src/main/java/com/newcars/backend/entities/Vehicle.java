package com.newcars.backend.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_vehicle")
public class Vehicle implements Serializable {

	// Serializable
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String model;
	private String manufacturer;
	private Integer year_number;
	private Double price;
	private String description;
	private String category;
	
    private List<String> images;
	
	private boolean avaiable;
	
	// Relation with user
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	public Vehicle() {}
	
	public Vehicle(Long id, String model, String manufacturer, Integer year_number, Double price, String description,
			String category, List<String> images, boolean avaiable, User user) {
		super();
		this.id = id;
		this.model = model;
		this.manufacturer = manufacturer;
		this.year_number = year_number;
		this.price = price;
		this.description = description;
		this.category = category;
		this.images = images;
		this.avaiable = avaiable;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public boolean isAvaiable() {
		return avaiable;
	}

	public void setAvaiable(boolean avaiable) {
		this.avaiable = avaiable;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vehicle other = (Vehicle) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Vehicle id=" + id + ", model=" + model + ", manufacturer=" + manufacturer + ", year_number=" + year_number
				+ ", price=" + price + ", description=" + description + ", category=" + category + ", images=" + images
				+ ", avaiable=" + avaiable + ", user=" + user;
	}
	
}
