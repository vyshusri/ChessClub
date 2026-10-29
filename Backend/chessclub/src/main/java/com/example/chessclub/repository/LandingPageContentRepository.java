package com.example.chessclub.repository;

import com.example.chessclub.entity.LandingPageContent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandingPageContentRepository
        extends JpaRepository<LandingPageContent, Long> {

}