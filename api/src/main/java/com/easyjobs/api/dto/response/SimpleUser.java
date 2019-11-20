package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.Experience;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.model.Skill;
import com.easyjobs.api.model.User;

import java.util.Date;
import java.util.List;

public class SimpleUser {
    private String email;
    private Date birthDate;
    private String name;
    private String surname;
    private Profession profession;
    private List<Skill> skills;
    private List<Experience> experiences;

    public SimpleUser(User user) {
        this.email = user.getEmail();
        this.birthDate = user.getBirthDate();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.profession = user.getProfession();
        this.skills = user.getSkills();
        this.experiences = user.getExperiences();
    }

    public SimpleUser(String email, Date birthDate, String name, String surname, Profession profession, List<Skill> skills, List<Experience> experiences) {
        this.email = email;
        this.birthDate = birthDate;
        this.name = name;
        this.surname = surname;
        this.profession = profession;
        this.skills = skills;
        this.experiences = experiences;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
