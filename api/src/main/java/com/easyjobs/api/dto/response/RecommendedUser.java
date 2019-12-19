package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.*;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class RecommendedUser {
    private int id;
    private String email;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date birthDate;
    private String name;
    private String surname;
    private List<Skill> skills;
    private String picture;
    private Double matchRate;

    public RecommendedUser(User user, List<Assessment> assessments){
        this.id = user.getId();
        this.email = user.getEmail();
        this.birthDate = user.getBirthDate();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.skills = user.getSkills();
        this.picture = user.getPicture();
        this.matchRate = calculateMatchRate(this.getSkills(), assessments);
    }



    public RecommendedUser(int id, String email, Date birthDate, String name, String surname, List<Skill> skills, String picture, Double matchRate) {
        this.id = id;
        this.email = email;
        this.birthDate = birthDate;
        this.name = name;
        this.surname = surname;
        this.skills = skills;
        this.picture = picture;
        this.matchRate = matchRate;
    }

    public static Double calculateMatchRate(List<Skill> skills, List<Assessment> assessments) {
        List<Skill> skillsCopy = new ArrayList<>(skills);
        Double sum = 0.0;
        Double total = 0.0;
        for (Assessment requirement : assessments){
            total += requirement.getWeight();

            if(skillsCopy.removeIf(skill -> skill.getId() == requirement.getSkill().getId())){
                sum += requirement.getWeight();
            }
        }
        return sum / total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Double getMatchRate() {
        return matchRate;
    }

    public void setMatchRate(Double matchRate) {
        this.matchRate = matchRate;
    }
}
