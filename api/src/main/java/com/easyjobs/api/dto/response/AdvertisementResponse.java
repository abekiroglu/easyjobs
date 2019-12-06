package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.Advertisement;
import com.easyjobs.api.model.Assessment;
import com.easyjobs.api.model.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class AdvertisementResponse {
    private int id;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date publishDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    private List<Assessment> requirements;
    private List<Comment> comments;
    private int professionId;

    public AdvertisementResponse(Advertisement advertisement){
        this.id = advertisement.getId();
        this.publishDate = advertisement.getPublishDate();
        this.validUntil = advertisement.getValidUntil();
        this.description = advertisement.getDescription();
        this.requirements = advertisement.getRequirements();
        this.comments = advertisement.getComments();
        this.professionId = advertisement.getProfession().getId();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public List<Assessment> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<Assessment> requirements) {
        this.requirements = requirements;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getProfessionId() {
        return professionId;
    }

    public void setProfessionId(int professionId) {
        this.professionId = professionId;
    }
}
