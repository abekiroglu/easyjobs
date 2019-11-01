package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "job_application")
public class JobApplication extends BaseModel{
    private Date postDate;
    private boolean isResolved;
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    @JsonBackReference(value="user_applications")
    private User applicant;
    @ManyToOne
    @JoinColumn(name="company_id", referencedColumnName = "id")
    @JsonBackReference(value="company_applications")
    private Company appliedTo;
    private boolean isDeleted;

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public boolean isResolved() {
        return isResolved;
    }

    public void setResolved(boolean resolved) {
        isResolved = resolved;
    }

    public User getApplicant() {
        return applicant;
    }

    public void setApplicant(User applicant) {
        this.applicant = applicant;
    }

    public Company getAppliedTo() {
        return appliedTo;
    }

    public void setAppliedTo(Company appliedTo) {
        this.appliedTo = appliedTo;
    }
}