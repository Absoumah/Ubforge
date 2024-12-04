// package com.ubforge.ubforge.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {

//     @SuppressWarnings("removal")
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(auth -> auth
//                 // .requestMatchers("/issue/create").hasRole("MAINTAINER")            // Route pour les mainteneurs
//                 // .requestMatchers("/issue/assignToUser/**").hasRole("MAINTAINER")   // Route pour les mainteneurs
//                 // .requestMatchers("/user/create").hasAnyRole("DEV", "MAINTAINER")       // Routes pour les développeurs et mainteneurs
//                 // .requestMatchers("/task/assignTaskToUser/**").hasRole("MAINTAINER") // Assignation des tâches
//                 .anyRequest().permitAll()                             // Tout le reste nécessite une authentification
//             )
//             .httpBasic(); // Authentification basique pour simplifier
//         return http.build();
//     }
// }
