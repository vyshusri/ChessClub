package com.example.chessclub.controller;

import com.example.chessclub.entity.FreeBooking;
import com.example.chessclub.service.FreeBookingService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/free-bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class FreeBookingController {

    private final FreeBookingService freeBookingService;

    public FreeBookingController(
            FreeBookingService freeBookingService) {

        this.freeBookingService = freeBookingService;
    }

    // ==========================================
    // FREE CLASS BOOKING
    // ==========================================

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody FreeBooking booking) {

        try {

            FreeBooking savedBooking =
                    freeBookingService.createBooking(booking);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                            java.util.Map.of(
                                    "message",
                                    "Free class booking successful",
                                    "booking",
                                    savedBooking
                            )
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}