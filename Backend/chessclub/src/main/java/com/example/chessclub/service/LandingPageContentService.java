package com.example.chessclub.service;

import com.example.chessclub.entity.LandingPageContent;
import com.example.chessclub.repository.LandingPageContentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LandingPageContentService {

    private final LandingPageContentRepository repository;

    public LandingPageContentService(
            LandingPageContentRepository repository) {

        this.repository = repository;
    }


    // ==========================================
    // GET LANDING PAGE CONTENT
    // ==========================================

    public LandingPageContent getContent() {

        List<LandingPageContent> content =
                repository.findAll();

        // Create default content if database is empty
        if (content.isEmpty()) {

            LandingPageContent defaultContent =
                    new LandingPageContent();


            // ==========================================
            // HERO
            // ==========================================

            defaultContent.setHeroTitle(
                    "Your Move. Your Victory."
            );

            defaultContent.setHeroDescription(
                    "Where strategy meets passion. Learn, compete and master the game of chess with a community of ambitious players."
            );

            defaultContent.setHeroIcon("♟");


            // ==========================================
            // ABOUT - LEARN
            // ==========================================

            defaultContent.setLearnTitle("Learn");

            defaultContent.setLearnDescription(
                    "Build strong fundamentals and improve your understanding of chess through structured training."
            );

            defaultContent.setLearnIcon("♟");


            // ==========================================
            // ABOUT - COMPETE
            // ==========================================

            defaultContent.setCompeteTitle("Compete");

            defaultContent.setCompeteDescription(
                    "Participate in tournaments, challenges and exciting chess events."
            );

            defaultContent.setCompeteIcon("♞");


            // ==========================================
            // ABOUT - MASTER
            // ==========================================

            defaultContent.setMasterTitle("Master");

            defaultContent.setMasterDescription(
                    "Sharpen your strategic thinking and become a stronger, more confident player."
            );

            defaultContent.setMasterIcon("♛");


            // ==========================================
            // TRAINING
            // ==========================================

            defaultContent.setTrainingTitle(
                    "Chess Training"
            );

            defaultContent.setTrainingInfo(
                    "Professional chess training for players of all levels."
            );

            defaultContent.setTrainingIcon("♜");


            // ==========================================
            // FREE CLASS
            // ==========================================

            defaultContent.setFreeClassTitle(
                    "Your Chess Journey Starts Here."
            );

            defaultContent.setFreeClassInfo(
                    "Book your free chess class today."
            );

            defaultContent.setFreeClassIcon("♟");

            defaultContent.setFreeClassTimes(
        "10:00 AM - 11:00 AM\n" +
        "2:00 PM - 3:00 PM\n" +
        "5:00 PM - 6:00 PM\n" +
        "7:00 PM - 8:00 PM"
);


            // ==========================================
            // EVENTS
            // ==========================================

            defaultContent.setEventsTitle(
                    "Club Events"
            );


            defaultContent.setEvent1Title(
                    "Monthly Chess Tournament"
            );

            defaultContent.setEvent1Description(
                    "Test your skills against fellow club members."
            );

            defaultContent.setEvent1Icon("♟");


            defaultContent.setEvent2Title(
                    "Rapid Chess Championship"
            );

            defaultContent.setEvent2Description(
                    "Fast decisions. Sharp tactics. Maximum excitement."
            );

            defaultContent.setEvent2Icon("♞");


            defaultContent.setEvent3Title(
                    "Chess Workshop"
            );

            defaultContent.setEvent3Description(
                    "Learn advanced techniques from experienced players."
            );

            defaultContent.setEvent3Icon("♛");


            // ==========================================
            // CONTACT
            // ==========================================

            defaultContent.setContactInfo(
                    "Have a question about our chess club? We'd love to hear from you."
            );

            defaultContent.setEmailIcon("✉");

            defaultContent.setPhoneIcon("☎");


            return repository.save(defaultContent);
        }

        return content.get(0);
    }


    // ==========================================
    // ADMIN UPDATE LANDING PAGE
    // ==========================================

    public LandingPageContent updateContent(
            LandingPageContent updatedContent) {

        LandingPageContent existingContent =
                getContent();


        // ==========================================
        // HERO
        // ==========================================

        existingContent.setHeroTitle(
                updatedContent.getHeroTitle()
        );

        existingContent.setHeroDescription(
                updatedContent.getHeroDescription()
        );

        existingContent.setHeroIcon(
                updatedContent.getHeroIcon()
        );


        // ==========================================
        // LEARN
        // ==========================================

        existingContent.setLearnTitle(
                updatedContent.getLearnTitle()
        );

        existingContent.setLearnDescription(
                updatedContent.getLearnDescription()
        );

        existingContent.setLearnIcon(
                updatedContent.getLearnIcon()
        );


        // ==========================================
        // COMPETE
        // ==========================================

        existingContent.setCompeteTitle(
                updatedContent.getCompeteTitle()
        );

        existingContent.setCompeteDescription(
                updatedContent.getCompeteDescription()
        );

        existingContent.setCompeteIcon(
                updatedContent.getCompeteIcon()
        );


        // ==========================================
        // MASTER
        // ==========================================

        existingContent.setMasterTitle(
                updatedContent.getMasterTitle()
        );

        existingContent.setMasterDescription(
                updatedContent.getMasterDescription()
        );

        existingContent.setMasterIcon(
                updatedContent.getMasterIcon()
        );


        // ==========================================
        // TRAINING
        // ==========================================

        existingContent.setTrainingTitle(
                updatedContent.getTrainingTitle()
        );

        existingContent.setTrainingInfo(
                updatedContent.getTrainingInfo()
        );

        existingContent.setTrainingIcon(
                updatedContent.getTrainingIcon()
        );

        existingContent.setFreeClassTimes(
        updatedContent.getFreeClassTimes()
);

        // ==========================================
        // FREE CLASS
        // ==========================================

        existingContent.setFreeClassTitle(
                updatedContent.getFreeClassTitle()
        );

        existingContent.setFreeClassInfo(
                updatedContent.getFreeClassInfo()
        );

        existingContent.setFreeClassIcon(
                updatedContent.getFreeClassIcon()
        );


        // ==========================================
        // EVENTS
        // ==========================================

        existingContent.setEventsTitle(
                updatedContent.getEventsTitle()
        );


        existingContent.setEvent1Title(
                updatedContent.getEvent1Title()
        );

        existingContent.setEvent1Description(
                updatedContent.getEvent1Description()
        );

        existingContent.setEvent1Icon(
                updatedContent.getEvent1Icon()
        );


        existingContent.setEvent2Title(
                updatedContent.getEvent2Title()
        );

        existingContent.setEvent2Description(
                updatedContent.getEvent2Description()
        );

        existingContent.setEvent2Icon(
                updatedContent.getEvent2Icon()
        );


        existingContent.setEvent3Title(
                updatedContent.getEvent3Title()
        );

        existingContent.setEvent3Description(
                updatedContent.getEvent3Description()
        );

        existingContent.setEvent3Icon(
                updatedContent.getEvent3Icon()
        );


        // ==========================================
        // CONTACT
        // ==========================================

        existingContent.setContactInfo(
                updatedContent.getContactInfo()
        );

        existingContent.setEmailIcon(
                updatedContent.getEmailIcon()
        );

        existingContent.setPhoneIcon(
                updatedContent.getPhoneIcon()
        );


        return repository.save(existingContent);
    }
}