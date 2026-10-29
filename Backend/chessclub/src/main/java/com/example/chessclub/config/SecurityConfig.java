package com.example.chessclub.config;

import com.example.chessclub.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration(proxyBeanMethods = false)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CorsConfigurationSource corsConfigurationSource)
            throws Exception {

        http

                // ==============================
                // CORS
                // ==============================
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource
                        )
                )

                // ==============================
                // CSRF
                // ==============================
                .csrf(csrf -> csrf.disable())

                // ==============================
                // STATELESS JWT
                // ==============================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ==============================
                // AUTHORIZATION
                // ==============================
                .authorizeHttpRequests(auth -> auth

                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // ==========================
                        // PUBLIC APIs
                        // ==========================

                        .requestMatchers(
    "/api/users/register",
    "/api/users/login",
    "/api/admin/login",
    "/api/free-class/login"
).permitAll()

.requestMatchers("/api/free-class/change-password")
.hasRole("FREE_CLASS")

                        // Landing Page - PUBLIC
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/landing-page"
                        ).permitAll()

                        // Contact Us
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/leads"
                        ).permitAll()

                        // Free Class Booking
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/free-bookings"
                        ).permitAll()

                        // ==========================
// IMAGE UPLOAD
// ==========================

// Only ADMIN can upload images
.requestMatchers(
        HttpMethod.POST,
        "/api/upload"
).hasRole("ADMIN")

// Uploaded images are public
.requestMatchers(
        HttpMethod.GET,
        "/uploads/**"
).permitAll()

                        // ==========================
                        // ADMIN APIs
                        // ==========================

                        .requestMatchers(
                                "/api/admin/dashboard/**",
                                "/api/admin/students/**",
                                "/api/admin/add-admin"
                        ).hasRole("ADMIN")

                        // Admin manages leads
                        .requestMatchers(
                                "/api/leads/**"
                        ).hasRole("ADMIN")

                        // ==========================
                        // EVERYTHING ELSE
                        // ==========================

                        .anyRequest().authenticated()
                )

                // ==============================
                // JWT FILTER
                // ==============================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // ==================================================
    // CORS CONFIGURATION
    // ==================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // ==================================================
    // PASSWORD ENCODER
    // ==================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }
}