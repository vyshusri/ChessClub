package com.example.chessclub.dto;

public class FreeBookingUpdateRequest {

    private String meetingLink;
    private String status;

    public FreeBookingUpdateRequest() {
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