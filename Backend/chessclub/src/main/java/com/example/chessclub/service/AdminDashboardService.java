package com.example.chessclub.service;

import com.example.chessclub.repository.UserRepository;
import com.example.chessclub.repository.LeadRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final LeadRepository leadRepository;

    public AdminDashboardService(
            UserRepository userRepository,
            LeadRepository leadRepository) {

        this.userRepository = userRepository;
        this.leadRepository = leadRepository;
    }

    public Map<String, Long> getDashboardStats() {

        long totalStudents =
                userRepository.countByRole("STUDENT");

        long totalLeads =
                leadRepository.count();

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalStudents", totalStudents);
        stats.put("totalLeads", totalLeads);

        return stats;
    }
}