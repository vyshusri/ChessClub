package com.example.chessclub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "landing_page_content")
public class LandingPageContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // HERO
    // ==========================================

    private String heroTitle;

    @Column(length = 1000)
    private String heroDescription;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String heroIcon;

    // ==========================================
    // ABOUT - LEARN
    // ==========================================

    private String learnTitle;

    @Column(length = 1000)
    private String learnDescription;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String learnIcon;

    // ==========================================
    // ABOUT - COMPETE
    // ==========================================

    private String competeTitle;

    @Column(length = 1000)
    private String competeDescription;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String competeIcon;

    // ==========================================
    // ABOUT - MASTER
    // ==========================================

    private String masterTitle;

    @Column(length = 1000)
    private String masterDescription;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String masterIcon;

    // ==========================================
    // TRAINING
    // ==========================================

    private String trainingTitle;

    @Column(length = 1000)
    private String trainingInfo;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String trainingIcon;

    // ==========================================
    // FREE CLASS
    // ==========================================

    
// ==========================================
// FREE CLASS
// ==========================================

private String freeClassTitle;

@Column(length = 1000)
private String freeClassInfo;

@Lob
@Column(columnDefinition = "LONGTEXT")
private String freeClassIcon;

@Lob
@Column(columnDefinition = "LONGTEXT")
private String freeClassTimes;
    

    // ==========================================
    // EVENTS
    // ==========================================

    private String eventsTitle;

    private String event1Title;

    @Column(length = 1000)
    private String event1Description;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String event1Icon;

    private String event2Title;

    @Column(length = 1000)
    private String event2Description;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String event2Icon;

    private String event3Title;

    @Column(length = 1000)
    private String event3Description;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String event3Icon;

    // ==========================================
    // CONTACT
    // ==========================================

    @Column(length = 1000)
    private String contactInfo;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String emailIcon;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String phoneIcon;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public LandingPageContent() {
    }

    // ==========================================
    // GETTERS AND SETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }

    public String getHeroIcon() {
        return heroIcon;
    }

    public void setHeroIcon(String heroIcon) {
        this.heroIcon = heroIcon;
    }

    public String getLearnTitle() {
        return learnTitle;
    }

    public void setLearnTitle(String learnTitle) {
        this.learnTitle = learnTitle;
    }

    public String getLearnDescription() {
        return learnDescription;
    }

    public void setLearnDescription(String learnDescription) {
        this.learnDescription = learnDescription;
    }

    public String getLearnIcon() {
        return learnIcon;
    }

    public void setLearnIcon(String learnIcon) {
        this.learnIcon = learnIcon;
    }

    public String getCompeteTitle() {
        return competeTitle;
    }

    public void setCompeteTitle(String competeTitle) {
        this.competeTitle = competeTitle;
    }

    public String getCompeteDescription() {
        return competeDescription;
    }

    public void setCompeteDescription(String competeDescription) {
        this.competeDescription = competeDescription;
    }

    public String getCompeteIcon() {
        return competeIcon;
    }

    public void setCompeteIcon(String competeIcon) {
        this.competeIcon = competeIcon;
    }

    public String getMasterTitle() {
        return masterTitle;
    }

    public void setMasterTitle(String masterTitle) {
        this.masterTitle = masterTitle;
    }

    public String getMasterDescription() {
        return masterDescription;
    }

    public void setMasterDescription(String masterDescription) {
        this.masterDescription = masterDescription;
    }

    public String getMasterIcon() {
        return masterIcon;
    }

    public void setMasterIcon(String masterIcon) {
        this.masterIcon = masterIcon;
    }

    public String getTrainingTitle() {
        return trainingTitle;
    }

    public void setTrainingTitle(String trainingTitle) {
        this.trainingTitle = trainingTitle;
    }

    public String getTrainingInfo() {
        return trainingInfo;
    }

    public void setTrainingInfo(String trainingInfo) {
        this.trainingInfo = trainingInfo;
    }

    public String getTrainingIcon() {
        return trainingIcon;
    }

    public void setTrainingIcon(String trainingIcon) {
        this.trainingIcon = trainingIcon;
    }

    public String getFreeClassTitle() {
        return freeClassTitle;
    }

    public void setFreeClassTitle(String freeClassTitle) {
        this.freeClassTitle = freeClassTitle;
    }

    public String getFreeClassInfo() {
        return freeClassInfo;
    }

    public void setFreeClassInfo(String freeClassInfo) {
        this.freeClassInfo = freeClassInfo;
    }

    public String getFreeClassIcon() {
        return freeClassIcon;
    }

    public void setFreeClassIcon(String freeClassIcon) {
        this.freeClassIcon = freeClassIcon;
    }

    public String getFreeClassTimes() {
    return freeClassTimes;
}

public void setFreeClassTimes(String freeClassTimes) {
    this.freeClassTimes = freeClassTimes;
}

    public String getEventsTitle() {
        return eventsTitle;
    }

    public void setEventsTitle(String eventsTitle) {
        this.eventsTitle = eventsTitle;
    }

    public String getEvent1Title() {
        return event1Title;
    }

    public void setEvent1Title(String event1Title) {
        this.event1Title = event1Title;
    }

    public String getEvent1Description() {
        return event1Description;
    }

    public void setEvent1Description(String event1Description) {
        this.event1Description = event1Description;
    }

    public String getEvent1Icon() {
        return event1Icon;
    }

    public void setEvent1Icon(String event1Icon) {
        this.event1Icon = event1Icon;
    }

    public String getEvent2Title() {
        return event2Title;
    }

    public void setEvent2Title(String event2Title) {
        this.event2Title = event2Title;
    }

    public String getEvent2Description() {
        return event2Description;
    }

    public void setEvent2Description(String event2Description) {
        this.event2Description = event2Description;
    }

    public String getEvent2Icon() {
        return event2Icon;
    }

    public void setEvent2Icon(String event2Icon) {
        this.event2Icon = event2Icon;
    }

    public String getEvent3Title() {
        return event3Title;
    }

    public void setEvent3Title(String event3Title) {
        this.event3Title = event3Title;
    }

    public String getEvent3Description() {
        return event3Description;
    }

    public void setEvent3Description(String event3Description) {
        this.event3Description = event3Description;
    }

    public String getEvent3Icon() {
        return event3Icon;
    }

    public void setEvent3Icon(String event3Icon) {
        this.event3Icon = event3Icon;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getEmailIcon() {
        return emailIcon;
    }

    public void setEmailIcon(String emailIcon) {
        this.emailIcon = emailIcon;
    }

    public String getPhoneIcon() {
        return phoneIcon;
    }

    public void setPhoneIcon(String phoneIcon) {
        this.phoneIcon = phoneIcon;
    }
    
}