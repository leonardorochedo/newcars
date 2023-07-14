package com.newcars.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newcars.backend.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}