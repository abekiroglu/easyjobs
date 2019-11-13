package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "app_user")
public class User extends BaseModel{
    private String email;
    private boolean isValidated;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value="user_comments")
    private List<Comment> comments;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value="user_applications")
    private List<JobApplication> applications;
    private Boolean isDeleted;
    @JsonIgnore
    @Column(nullable = true)
    private Long lastActionTime;
    private Date birthDate;
    private String name;
    private String surname;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "profession_id", referencedColumnName = "id")
    @JsonManagedReference(value="user_profession")
    private Profession profession;
    @ManyToMany(fetch = FetchType.LAZY, cascade =CascadeType.ALL)
    @JoinTable(name = "user_skills",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_id") })
    @JsonManagedReference("user_skills")
    private List<Skill> skills;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value="user_experience")
    private List<Experience> experiences;

    public User() {
    }
    //TODO: Use AWS EC3 to store images.
    // private URI picture


    public Long getLastActionTime() {
        return lastActionTime;
    }

    public void setLastActionTime(Long lastActionTime) {
        this.lastActionTime = lastActionTime;
    }

    @JsonIgnore
    public Boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isValidated() {
        return isValidated;
    }

    public void setValidated(boolean validated) {
        isValidated = validated;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<JobApplication> getApplications() {
        return applications;
    }

    public void setApplications(List<JobApplication> applications) {
        this.applications = applications;
    }


}
