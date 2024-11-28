package com.ubforge.ubforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EntityScan(basePackages = "com.ubforge.ubforge.model")
@EnableJpaRepositories(basePackages = "com.ubforge.ubforge.repository")
public class UbforgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(UbforgeApplication.class, args);
	}

}
