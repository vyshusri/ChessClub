package com.example.chessclub.repository;

import com.example.chessclub.entity.FreeClassAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FreeClassAccountRepository
        extends JpaRepository<FreeClassAccount, Long> {

    Optional<FreeClassAccount> findByEmail(String email);

    boolean existsByEmail(String email);
}