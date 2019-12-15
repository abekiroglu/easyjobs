package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.Advertisement;
import com.easyjobs.api.model.Assessment;
import com.easyjobs.api.model.Skill;
import com.easyjobs.api.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.*;

public class SimpleAdvertisement {
    private int id;
    private String title;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date publishDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    private SimpleCompany company;
    private Double matchRate;

    public SimpleAdvertisement(Advertisement advertisement, List<Skill> skills){
        this.title = advertisement.getTitle();
        this.id = advertisement.getId();
        this.publishDate = advertisement.getPublishDate();
        this.validUntil = advertisement.getValidUntil();
        this.description = advertisement.getDescription();
        this.company = new SimpleCompany(advertisement.getCompany());
        this.matchRate = calculateMatchRate(advertisement.getRequirements(), skills);
    }

    public SimpleAdvertisement(int id, Date publishDate, Date validUntil, String description, SimpleCompany company) {
        this.id = id;
        this.publishDate = publishDate;
        this.validUntil = validUntil;
        this.description = description;
        this.company = company;
    }


    private Double calculateMatchRate(List<Assessment> requirements, List<Skill> skills) {
        List<Skill> skillsCopy = new ArrayList<>(skills);
        Double sum = 0.0;
        Double total = 0.0;
        for (Assessment requirement : requirements){
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SimpleCompany getCompany() {
        return company;
    }

    public void setCompany(SimpleCompany company) {
        this.company = company;
    }

    public Double getMatchRate() {
        return matchRate;
    }

    public void setMatchRate(Double matchRate) {
        this.matchRate = matchRate;
    }
}
