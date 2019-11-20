package com.easyjobs.api.dto.request;

import com.easyjobs.api.model.Comment;
import com.easyjobs.api.model.Experience;
import com.easyjobs.api.model.Skill;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class UserUpdateRequest {
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date birthDate;
    private String name;
    private String surname;
    private Integer profession;
    private List<Experience> newExperiences;
    private List<Experience> deletedExperiences;
    private List<Skill> newSkills;
    private List<Skill> deletedSkills;
    //TODO: Use AWS EC3 to store images.
    // private URI picture

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

    public Integer getProfession() {
        return profession;
    }

    public void setProfession(Integer profession) {
        this.profession = profession;
    }

    public List<Experience> getNewExperiences() {
        return newExperiences;
    }

    public void setNewExperiences(List<Experience> newExperiences) {
        this.newExperiences = newExperiences;
    }

    public List<Experience> getDeletedExperiences() {
        return deletedExperiences;
    }

    public void setDeletedExperiences(List<Experience> deletedExperiences) {
        this.deletedExperiences = deletedExperiences;
    }

    public List<Skill> getNewSkills() {
        return newSkills;
    }

    public void setNewSkills(List<Skill> newSkills) {
        this.newSkills = newSkills;
    }

    public List<Skill> getDeletedSkills() {
        return deletedSkills;
    }

    public void setDeletedSkills(List<Skill> deletedSkills) {
        this.deletedSkills = deletedSkills;
    }
}
