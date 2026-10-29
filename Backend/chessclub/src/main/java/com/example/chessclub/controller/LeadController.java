package com.example.chessclub.controller;

import com.example.chessclub.entity.Lead;
import com.example.chessclub.service.LeadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:5173")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    // ================= CREATE LEAD =================

    @PostMapping
    public ResponseEntity<?> createLead(@RequestBody Lead lead) {

        try {
            Lead savedLead = leadService.createLead(lead);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedLead);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Failed to create lead");
        }
    }


    // ================= GET ALL LEADS =================

    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads() {

        return ResponseEntity.ok(
                leadService.getAllLeads()
        );
    }


    // ================= GET LEAD BY ID =================

    @GetMapping("/{id}")
    public ResponseEntity<?> getLeadById(
            @PathVariable Long id) {

        Lead lead = leadService.getLeadById(id);

        if (lead == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Lead not found");
        }

        return ResponseEntity.ok(lead);
    }


    // ================= UPDATE STATUS =================

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Status is required");
        }

        Lead updatedLead =
                leadService.updateStatus(id, status);

        if (updatedLead == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Lead not found");
        }

        return ResponseEntity.ok(updatedLead);
    }


    // ================= DELETE LEAD =================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLead(
            @PathVariable Long id) {

        boolean deleted =
                leadService.deleteLead(id);

        if (!deleted) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Lead not found");
        }

        return ResponseEntity.ok(
                "Lead deleted successfully"
        );
    }
}