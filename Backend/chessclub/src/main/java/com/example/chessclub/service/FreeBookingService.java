package com.example.chessclub.service;

import com.example.chessclub.entity.FreeBooking;
import com.example.chessclub.entity.FreeClassAccount;
import com.example.chessclub.repository.FreeBookingRepository;
import com.example.chessclub.repository.FreeClassAccountRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class FreeBookingService {

    private final FreeBookingRepository freeBookingRepository;
    private final FreeClassAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public FreeBookingService(
            FreeBookingRepository freeBookingRepository,
            FreeClassAccountRepository accountRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {

        this.freeBookingRepository = freeBookingRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public FreeBooking createBooking(FreeBooking booking) {

        // Check if an account already exists
        if (accountRepository.existsByEmail(booking.getEmail())) {
            throw new RuntimeException(
                    "An account already exists with this email"
            );
        }

        // ==========================================
        // CREATE FREE CLASS ACCOUNT
        // ==========================================

        FreeClassAccount account = new FreeClassAccount();

        account.setName(booking.getName());
        account.setEmail(booking.getEmail());
        account.setPhone(booking.getPhone());

        // Temporary password = phone number
        // Password is stored securely using BCrypt
        account.setPassword(
                passwordEncoder.encode(booking.getPhone())
        );

        // User must change password after first login
        account.setMustChangePassword(true);

        // Save account
        accountRepository.save(account);

        // ==========================================
        // SAVE FREE CLASS BOOKING
        // ==========================================

        FreeBooking savedBooking =
                freeBookingRepository.save(booking);

        // ==========================================
        // SEND CONFIRMATION EMAIL
        // ==========================================

        emailService.sendFreeClassConfirmation(
                booking.getEmail(),
                booking.getName(),
                booking.getSectionTime()
        );

        return savedBooking;
    }
}