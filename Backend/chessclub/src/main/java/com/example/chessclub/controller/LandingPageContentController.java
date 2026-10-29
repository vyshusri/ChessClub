package com.example.chessclub.controller;

import com.example.chessclub.entity.LandingPageContent;
import com.example.chessclub.service.LandingPageContentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/landing-page")
@CrossOrigin(origins = "http://localhost:5173")
public class LandingPageContentController {

    private final LandingPageContentService service;

    public LandingPageContentController(
            LandingPageContentService service) {

        this.service = service;
    }

    // ==========================================
    // PUBLIC
    // GET LANDING PAGE CONTENT
    // ==========================================

    @GetMapping
    public ResponseEntity<LandingPageContent> getContent() {

        return ResponseEntity.ok(
                service.getContent()
        );
    }


    // ==========================================
    // ADMIN ONLY
    // UPDATE LANDING PAGE CONTENT
    // ==========================================

    @PutMapping
    public ResponseEntity<LandingPageContent> updateContent(
            @RequestBody LandingPageContent content) {

        return ResponseEntity.ok(
                service.updateContent(content)
        );
    }
}