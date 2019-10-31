package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "advertisement")
public class Advertisement extends BaseModel{
    private Date publishDate;
    private Date validUntil;
    private String description;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference(value="advertisement_assessments")
    private List<Assessment> requirements;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference(value="advertisement_comments")
    private List<Comment> comments;
    @ManyToOne
    @JoinColumn(name="profession_id", referencedColumnName = "id")
    @JsonBackReference(value="advertisement_profession")
    private Profession profession;
    private boolean isDeleted;

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
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

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }
}
