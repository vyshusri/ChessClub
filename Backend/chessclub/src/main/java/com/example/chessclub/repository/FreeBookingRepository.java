package com.example.chessclub.repository;

import com.example.chessclub.entity.FreeBooking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreeBookingRepository extends JpaRepository<FreeBooking, Long> {

    List<FreeBooking> findByEmailOrderByIdDesc(String email);

}