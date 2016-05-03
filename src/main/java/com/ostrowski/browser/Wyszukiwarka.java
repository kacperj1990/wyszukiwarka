/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ostrowski.browser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 *
 * @author Kacper
 */
@SpringBootApplication
public class Wyszukiwarka {

    public static void main(String[] args) {
        SpringApplication.run(Wyszukiwarka.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:9000")
			.allowedMethods("GET", "POST", "PUT", "DELETE")
			.allowedHeaders("Content-Type", "Authorization")
			//.exposedHeaders("header1", "header2")
			//.allowCredentials(false)
                        .maxAge(3600);
            }
        };
    }
}
