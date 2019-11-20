package com.easyjobs.api.dto.request;

import com.easyjobs.api.model.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class CompanyUpdateRequest {
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date foundedDate;
    private String name;
    private String description;
    private List<Comment> newComments;
    private List<Comment> deletedComments;

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

    public List<Comment> getNewComments() {
        return newComments;
    }

    public void setNewComments(List<Comment> newComments) {
        this.newComments = newComments;
    }

    public List<Comment> getDeletedComments() {
        return deletedComments;
    }

    public void setDeletedComments(List<Comment> deletedComments) {
        this.deletedComments = deletedComments;
    }
}
