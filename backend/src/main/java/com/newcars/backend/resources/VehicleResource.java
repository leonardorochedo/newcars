package com.newcars.backend.resources;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.newcars.backend.dtos.CreateVehicleDto;
import com.newcars.backend.entities.Vehicle;
import com.newcars.backend.responses.ApiResponse;
import com.newcars.backend.responses.ErrorResponse;
import com.newcars.backend.services.VehicleService;

@RestController
@RequestMapping(value = "/vehicles")
public class VehicleResource {

	@Autowired
	private VehicleService vehicleService;
	
	@GetMapping
	public ResponseEntity<List<Vehicle>> findAll() {
		List<Vehicle> vehicles = vehicleService.findAll();
		
		return ResponseEntity.ok().body(vehicles);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Vehicle> findById(@PathVariable Long id) {
		Vehicle vehicle = vehicleService.findById(id);
		
		return ResponseEntity.ok().body(vehicle);
	}
	
	@PostMapping(value = "/create")
	public ResponseEntity<?> create(@RequestHeader("Authorization") String authorizationHeader, @ModelAttribute CreateVehicleDto vehicle, List<MultipartFile> images) throws IOException, IllegalArgumentException {
		try {
			ApiResponse<Vehicle> response = vehicleService.create(authorizationHeader, vehicle, images);
			
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
