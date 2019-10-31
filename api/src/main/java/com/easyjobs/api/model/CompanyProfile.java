package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "company_profile")
public class CompanyProfile extends BaseModel{
    private Date foundedDate;
    private String name;
    private String description;
    // TODO: Design a meaningful way to represent and store geographic location.
    //  private Location location
    @OneToMany(cascade = CascadeType.ALL)
    @JsonManagedReference(value="company_comments")
    private List <Comment> comments;
    //TODO: Use AWS EC3 to store images.
    // private URI picture
    private boolean isDeleted;

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getFoundedDate() {
        return foundedDate;
    }

    public void setFoundedDate(Date foundedDate) {
        this.foundedDate = foundedDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
