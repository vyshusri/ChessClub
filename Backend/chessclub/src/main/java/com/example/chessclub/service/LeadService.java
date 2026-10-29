package com.example.chessclub.service;

import com.example.chessclub.entity.Lead;
import com.example.chessclub.repository.LeadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    // Create a new lead
    public Lead createLead(Lead lead) {

        // New leads are automatically marked as NEW
        lead.setStatus("NEW");

        return leadRepository.save(lead);
    }

    // Get all leads
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    // Get lead by ID
    public Lead getLeadById(Long id) {
        return leadRepository.findById(id)
                .orElse(null);
    }

    // Update lead status
    public Lead updateStatus(Long id, String status) {

        Lead lead = leadRepository.findById(id)
                .orElse(null);

        if (lead == null) {
            return null;
        }

        lead.setStatus(status);

        return leadRepository.save(lead);
    }

    // Delete lead
    public boolean deleteLead(Long id) {

        if (!leadRepository.existsById(id)) {
            return false;
        }

        leadRepository.deleteById(id);

        return true;
    }
}