package com.example.chessclub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "free_bookings")
public class FreeBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String sectionTime;

    @Column(length = 1000)
private String meetingLink;

@Column(nullable = false)
private String status = "PENDING";
    // Default constructor
    public FreeBooking() {
    }

    // Constructor
    public FreeBooking(
            String name,
            String email,
            String phone,
            String sectionTime) {

        this.name = name;
        this.email = email;
        this.phone = phone;
        this.sectionTime = sectionTime;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSectionTime() {
        return sectionTime;
    }

    public void setSectionTime(String sectionTime) {
        this.sectionTime = sectionTime;
    }

    public String getMeetingLink() {
    return meetingLink;
}

public void setMeetingLink(String meetingLink) {
    this.meetingLink = meetingLink;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}