package com.example.chessclub.controller;

import com.example.chessclub.entity.User;
import com.example.chessclub.service.UserService;
import com.example.chessclub.dto.LoginRequest;
import com.example.chessclub.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AuthService authService;
    private final UserService userService;

    public AdminController(
            AuthService authService,
            UserService userService) {

        this.authService = authService;
        this.userService = userService;
    }

    // ==================================================
    // ADMIN → ADD STUDENT
    // ==================================================

    @PostMapping("/students")
    public ResponseEntity<?> addStudent(
            @RequestBody User student) {

        try {

            // Admin is creating a STUDENT
            student.setRole("STUDENT");

            User savedStudent =
                    userService.register(student);

            // Never return password
            savedStudent.setPassword(null);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // ==================================================
    // ADMIN → ADD ANOTHER ADMIN
    // ==================================================

    @PostMapping("/add-admin")
    public ResponseEntity<?> addAdmin(
            @RequestBody User admin) {

        try {

            // Existing ADMIN is creating another ADMIN
            admin.setRole("ADMIN");

            User savedAdmin =
                    userService.register(admin);

            // Never return password
            savedAdmin.setPassword(null);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedAdmin);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // ==================================================
    // ADMIN LOGIN
    // ==================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            String token =
                    authService.login(request);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message",
                            "Admin login successful",
                            "token",
                            token
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}