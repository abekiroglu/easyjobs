package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "advertisement")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Advertisement extends BaseModel{
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date publishDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Assessment> requirements;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments;
    @ManyToOne
    @JoinColumn(name="profession_id", referencedColumnName = "id")
    @JsonBackReference(value="advertisement_profession")
    private Profession profession;
    @ManyToOne
    @JoinColumn(name="company_id", referencedColumnName = "id")
    @JsonBackReference(value="advertisement_company")
    private Company company;

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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

}
