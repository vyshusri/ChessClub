package com.example.chessclub.service;

import com.example.chessclub.dto.FreeClassLoginRequest;
import com.example.chessclub.entity.FreeClassAccount;
import com.example.chessclub.repository.FreeClassAccountRepository;
import com.example.chessclub.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class FreeClassAuthService {

    private final FreeClassAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public FreeClassAuthService(
            FreeClassAccountRepository accountRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // FREE CLASS LOGIN
    public LoginResult login(FreeClassLoginRequest request) {

        FreeClassAccount account = accountRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                account.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(
                account.getEmail(),
                "FREE_CLASS"
        );

        return new LoginResult(
                token,
                account.isMustChangePassword(),
                account.getName(),
                account.getEmail()
        );
    }

    // CHANGE PASSWORD
    public void changePassword(
            String email,
            String currentPassword,
            String newPassword) {

        FreeClassAccount account = accountRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Free Class account not found"));

        // Check old password
        if (!passwordEncoder.matches(
                currentPassword,
                account.getPassword())) {

            throw new RuntimeException("Current password is incorrect");
        }

        // Validate new password
        if (newPassword == null || newPassword.trim().length() < 6) {

            throw new RuntimeException(
                    "New password must contain at least 6 characters");
        }

        // Save new password
        account.setPassword(
                passwordEncoder.encode(newPassword)
        );

        // User no longer needs to change password
        account.setMustChangePassword(false);

        accountRepository.save(account);
    }

    // LOGIN RESPONSE
    public record LoginResult(
            String token,
            boolean mustChangePassword,
            String name,
            String email
    ) {
    }
}