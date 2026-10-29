package com.example.chessclub.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFreeClassConfirmation(
            String email,
            String name,
            String sectionTime) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Chess Club - Free Class Registration Successful"
        );

        message.setText(
                "Hello " + name + ",\n\n" +

                "Your free Chess Club class registration " +
                "has been successfully completed.\n\n" +

                "Your class time:\n" +
                sectionTime + "\n\n" +

                "You can log in using:\n" +
                "Email: " + email + "\n" +
                "Temporary Password: Your registered phone number\n\n" +

                "For security, you must change your password " +
                "after your first login.\n\n" +

                "Thank you,\n" +
                "Chess Club"
        );

        mailSender.send(message);
 
   }

   public void sendFreeClassMeetingDetails(
        String email,
        String name,
        String sectionTime,
        String meetingLink) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(email);

    message.setSubject(
            "Chess Club - Your Free Class is Confirmed"
    );

    message.setText(
            "Hello " + name + ",\n\n" +

            "Your free Chess Club class has been confirmed.\n\n" +

            "Class Time:\n" +
            sectionTime + "\n\n" +

            "Your class session link:\n" +
            meetingLink + "\n\n" +

            "You can also log in to your Free Class Dashboard " +
            "to access the same session link.\n\n" +

            "Please join the session at your scheduled class time.\n\n" +

            "Thank you,\n" +
            "Chess Club"
    );

    mailSender.send(message);
}
}