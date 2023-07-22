package com.newcars.backend.services;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newcars.backend.dtos.CreateVehicleDto;
import com.newcars.backend.entities.User;
import com.newcars.backend.entities.Vehicle;
import com.newcars.backend.repositories.UserRepository;
import com.newcars.backend.repositories.VehicleRepository;
import com.newcars.backend.responses.ApiResponse;
import com.newcars.backend.responses.TextResponse;
import com.newcars.backend.utils.JwtUtil;

import io.jsonwebtoken.io.IOException;

@Service
public class VehicleService {
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Value("${image.vehicle.upload.directory}")
	private String imageUploadDirectory;
	
	public List<Vehicle> findAll() {
		List<Vehicle> vehicles = vehicleRepository.findAll();
		
		return vehicles;
	}
	
	public Vehicle findById(Long id) {
		Optional<Vehicle> vehicle = vehicleRepository.findById(id);
		
		return vehicle.get();
	}
	
	public ApiResponse<Vehicle> create(String authorizationHeader, CreateVehicleDto vehicle, List<MultipartFile> images) throws java.io.IOException {
		String token = JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		// Find user
		User user = userRepository.findByEmail(JwtUtil.getEmailFromToken(token));
		
		// Verify data
		if (vehicle.getModel() == null || vehicle.getManufacturer() == null || vehicle.getCategory() == null || vehicle.getDescription() == null || vehicle.getPrice() == null || vehicle.getYear_number() == null) {
		    throw new IllegalArgumentException("Um ou mais campos obrigatórios não estão preenchidos");
		}
		
		// Upload images
		List<String> listOfImagesPath = new ArrayList<String>();
		
		for (MultipartFile image : images) {
			String filename = UUID.randomUUID().toString();
			
			String path = Paths.get(imageUploadDirectory, filename).toString();
			
			
			try {
				Files.copy(image.getInputStream(), Paths.get(path)); // save in dir/images/vehicle
			} catch (IOException e) {
				throw new IOException("Arquivo não suportado!");
			}
			
			listOfImagesPath.add(filename);
		}
	    
		// Create vehicle
		Vehicle newVehicle = new Vehicle(null, vehicle.getModel(), vehicle.getManufacturer(), vehicle.getYear_number(), vehicle.getPrice(), vehicle.getDescription(), vehicle.getCategory(), listOfImagesPath, true, user);
		
		// Save in db
		vehicleRepository.save(newVehicle);
		
		ApiResponse<Vehicle> response = new ApiResponse<Vehicle>("Veículo criado com sucesso!", newVehicle);
		
		return response;
	}
	
	public ApiResponse<Vehicle> editVehicle(String authorizationHeader, Long id, CreateVehicleDto vehicle, List<MultipartFile> images) throws java.io.IOException {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		Vehicle editedVehicle = vehicleRepository.findById(id).get();
		
		// Verify data
		if (vehicle.getModel() == null || vehicle.getManufacturer() == null || vehicle.getCategory() == null || vehicle.getDescription() == null || vehicle.getPrice() == null || vehicle.getYear_number() == null) {
		    throw new IllegalArgumentException("Um ou mais campos obrigatórios não estão preenchidos");
		}
		
		// Remove images
		List<String> existingImages = editedVehicle.getImages();
		
		for (String imagePath : existingImages) {
		    try {
		        Files.deleteIfExists(Paths.get(imageUploadDirectory, imagePath));
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}
		
		// Upload images
		List<String> listOfImagesPath = new ArrayList<String>();
		
		for (MultipartFile image : images) {
			String filename = UUID.randomUUID().toString();
			
			String path = Paths.get(imageUploadDirectory, filename).toString();
			
			
			try {
				Files.copy(image.getInputStream(), Paths.get(path)); // save in dir/images/vehicle
			} catch (IOException e) {
				throw new IOException("Arquivo não suportado!");
			}
			
			listOfImagesPath.add(filename);
		}
	    
		// Update vehicle
		editedVehicle.setModel(vehicle.getModel());
		editedVehicle.setManufacturer(vehicle.getManufacturer());
		editedVehicle.setYear_number(vehicle.getYear_number());
		editedVehicle.setPrice(vehicle.getPrice());
		editedVehicle.setDescription(vehicle.getDescription());
		editedVehicle.setCategory(vehicle.getCategory());
		editedVehicle.setImages(listOfImagesPath);
		
		// Save in db
		vehicleRepository.save(editedVehicle);
		
		ApiResponse<Vehicle> response = new ApiResponse<Vehicle>("Veículo atualizado com sucesso!", editedVehicle);
		
		return response;
	}
	
	public TextResponse deleteVehicle(String authorizationHeader, Long id) throws java.io.IOException {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		// Delete images
		Vehicle vehicle = vehicleRepository.findById(id).get();
		
		List<String> existingImages = vehicle.getImages();
		
		for (String filenameImage : existingImages) {
		    try {
		        Files.deleteIfExists(Paths.get(imageUploadDirectory, filenameImage));
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}
		
		vehicleRepository.deleteById(id);
		
		TextResponse response = new TextResponse("Veículo deletado com suceso!");
		
		return response;
	}
	
	public List<Vehicle> myVehicles(String authorizationHeader) {
		// Find user
		String token = JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		User user = userRepository.findByEmail(JwtUtil.getEmailFromToken(token));
		
		// Find vehicles
		List<Vehicle> vehicles = vehicleRepository.findByUserId(user.getId());
		
		return vehicles;
	}
	
	public TextResponse sale(String authorizationHeader, Long id) {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		Vehicle vehicle = vehicleRepository.findById(id).get();
		
		vehicle.setAvaiable(false);
		
		vehicleRepository.save(vehicle);
		
		TextResponse response = new TextResponse("Veículo vendido com suceso!");
		
		return response;
	}
	
	public TextResponse resale(String authorizationHeader, Long id) {
		JwtUtil.verifyTokenWithAuthorizationHeader(authorizationHeader);
		
		Vehicle vehicle = vehicleRepository.findById(id).get();
		
		vehicle.setAvaiable(true);
		
		vehicleRepository.save(vehicle);
		
		TextResponse response = new TextResponse("Veículo postado novamente!");
		
		return response;
	}
	
}
