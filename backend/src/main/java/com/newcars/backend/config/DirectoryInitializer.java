package com.newcars.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class DirectoryInitializer implements ApplicationRunner {

    @Value("${image.user.upload.directory}")
    private String userImageDirectory;

    @Value("${image.vehicle.upload.directory}")
    private String vehicleImageDirectory;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        createDirectory(userImageDirectory);
        createDirectory(vehicleImageDirectory);
    }

    private void createDirectory(String directoryPath) {
        File directory = new File(directoryPath);
        
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (created) {
                System.out.println("Created directory: " + directoryPath);
            } else {
                System.err.println("Failed to create directory: " + directoryPath);
            }
        }
    }
}