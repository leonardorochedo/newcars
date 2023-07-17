package com.newcars.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newcars.backend.entities.Vehicle;
import com.newcars.backend.repositories.VehicleRepository;

@Service
public class VehicleService {
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	public List<Vehicle> findAll() {
		List<Vehicle> vehicles = vehicleRepository.findAll();
		
		return vehicles;
	}
	
	public Vehicle findById(Long id) {
		Optional<Vehicle> vehicle = vehicleRepository.findById(id);
		
		return vehicle.get();
	}
}
