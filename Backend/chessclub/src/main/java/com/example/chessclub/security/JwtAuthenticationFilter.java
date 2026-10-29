package com.example.chessclub.security;

import com.example.chessclub.entity.FreeClassAccount;
import com.example.chessclub.entity.User;
import com.example.chessclub.repository.FreeClassAccountRepository;
import com.example.chessclub.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final FreeClassAccountRepository freeClassAccountRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository,
            FreeClassAccountRepository freeClassAccountRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.freeClassAccountRepository = freeClassAccountRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            String email = jwtService.extractEmail(token);

            if (SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

                // --------------------------------
                // 1. CHECK NORMAL USER / ADMIN
                // --------------------------------

                User user = userRepository
                        .findByEmail(email)
                        .orElse(null);

                if (user != null) {

                    String role = user.getRole();

                    System.out.println("JWT USER = " + user.getEmail());
                    System.out.println("JWT ROLE = [" + role + "]");

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority("ROLE_" + role);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user.getEmail(),
                                    null,
                                    List.of(authority)
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }

                // --------------------------------
                // 2. CHECK FREE CLASS ACCOUNT
                // --------------------------------

                else {

                    FreeClassAccount freeClassAccount =
                            freeClassAccountRepository
                                    .findByEmail(email)
                                    .orElse(null);

                    if (freeClassAccount != null) {

                        System.out.println(
                                "JWT FREE CLASS USER = "
                                        + freeClassAccount.getEmail()
                        );

                        SimpleGrantedAuthority authority =
                                new SimpleGrantedAuthority(
                                        "ROLE_FREE_CLASS"
                                );

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        freeClassAccount.getEmail(),
                                        null,
                                        List.of(authority)
                                );

                        SecurityContextHolder.getContext()
                                .setAuthentication(authentication);
                    }
                }
            }

        } catch (Exception e) {

            // Invalid or expired JWT.
            // Continue without authentication.
            System.out.println(
                    "Invalid JWT: " + e.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }
}