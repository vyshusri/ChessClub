package com.example.chessclub.controller;

import com.example.chessclub.dto.LoginRequest;
import com.example.chessclub.entity.User;
import com.example.chessclub.service.AuthService;
import com.example.chessclub.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(
            UserService userService,
            AuthService authService) {

        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            User registeredUser = userService.register(user);

            registeredUser.setPassword(null);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(registeredUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            String token = authService.login(request);

            return ResponseEntity.ok(
                    java.util.Map.of(
                            "message", "Login successful",
                            "token", token
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
    @GetMapping("/profile")
public ResponseEntity<?> getProfile(
        org.springframework.security.core.Authentication authentication) {

    String email = authentication.getName();

    User user = userService.findByEmail(email);

    if (user == null) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("User not found");
    }

    // Never send password to frontend
    user.setPassword(null);

    return ResponseEntity.ok(user);
}
    @GetMapping("/test")
public ResponseEntity<?> test() {
    return ResponseEntity.ok("JWT authentication is working!");
}

}