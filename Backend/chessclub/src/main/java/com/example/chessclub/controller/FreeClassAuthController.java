package com.example.chessclub.controller;

import com.example.chessclub.dto.ChangePasswordRequest;
import com.example.chessclub.dto.FreeClassLoginRequest;
import com.example.chessclub.service.FreeClassAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/free-class")
@CrossOrigin(origins = "http://localhost:5173")
public class FreeClassAuthController {

    private final FreeClassAuthService freeClassAuthService;

    public FreeClassAuthController(
            FreeClassAuthService freeClassAuthService) {
        this.freeClassAuthService = freeClassAuthService;
    }

    // FREE CLASS LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody FreeClassLoginRequest request) {

        try {

            FreeClassAuthService.LoginResult result =
                    freeClassAuthService.login(request);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Free Class login successful",
                            "token", result.token(),
                            "mustChangePassword",
                            result.mustChangePassword(),
                            "name", result.name(),
                            "email", result.email()
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message", e.getMessage()
                    )
            );
        }
    }

    // CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        try {

            String email = authentication.getName();

            freeClassAuthService.changePassword(
                    email,
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Password changed successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message", e.getMessage()
                    )
            );
        }
    }
}