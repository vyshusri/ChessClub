package com.example.chessclub.controller;

import com.example.chessclub.dto.FreeBookingUpdateRequest;
import com.example.chessclub.entity.FreeBooking;
import com.example.chessclub.repository.FreeBookingRepository;
import com.example.chessclub.service.EmailService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/free-bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminFreeBookingController {

private final FreeBookingRepository freeBookingRepository;
private final EmailService emailService;

   public AdminFreeBookingController(
        FreeBookingRepository freeBookingRepository,
        EmailService emailService) {

    this.freeBookingRepository = freeBookingRepository;
    this.emailService = emailService;
}

    @GetMapping
    public ResponseEntity<List<FreeBooking>> getAllBookings() {

        List<FreeBooking> bookings =
                freeBookingRepository.findAll();

        return ResponseEntity.ok(bookings);
    }

    
       
    @PutMapping("/{id}")
public ResponseEntity<?> updateBooking(
        @PathVariable Long id,
        @RequestBody FreeBookingUpdateRequest request) {

    FreeBooking booking = freeBookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    if (request.getMeetingLink() != null) {
        booking.setMeetingLink(request.getMeetingLink());
    }

    if (request.getStatus() != null) {
        booking.setStatus(request.getStatus());
    }

    FreeBooking updatedBooking =
            freeBookingRepository.save(booking);

    // Send email only when the class is confirmed
    if ("CONFIRMED".equalsIgnoreCase(booking.getStatus())
            && booking.getMeetingLink() != null
            && !booking.getMeetingLink().isBlank()) {

        emailService.sendFreeClassMeetingDetails(
                booking.getEmail(),
                booking.getName(),
                booking.getSectionTime(),
                booking.getMeetingLink()
        );
    }

    return ResponseEntity.ok(updatedBooking);
} 
}