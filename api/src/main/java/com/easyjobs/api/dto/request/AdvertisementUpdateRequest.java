package com.easyjobs.api.dto.request;

import com.easyjobs.api.model.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class AdvertisementUpdateRequest {
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    private List<AssessmentWrapper> newRequirements;
    private List<AssessmentWrapper> deletedRequirements;
    private List<AssessmentWrapper> updatedRequirements;
    private List<Comment> newComments;
    private List<Comment> deletedComments;
    private Integer professionId;


    public List<AssessmentWrapper> getUpdatedRequirements() {
        return updatedRequirements;
    }

    public void setUpdatedRequirements(List<AssessmentWrapper> updatedRequirements) {
        this.updatedRequirements = updatedRequirements;
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

    public List<Comment> getDeletedComments() {
        return deletedComments;
    }

    public void setDeletedComments(List<Comment> deletedComments) {
        this.deletedComments = deletedComments;
    }

    public List<Comment> getNewComments() {
        return newComments;
    }

    public void setNewComments(List<Comment> newComments) {
        this.newComments = newComments;
    }

    public List<AssessmentWrapper> getNewRequirements() {
        return newRequirements;
    }

    public void setNewRequirements(List<AssessmentWrapper> newRequirements) {
        this.newRequirements = newRequirements;
    }

    public List<AssessmentWrapper> getDeletedRequirements() {
        return deletedRequirements;
    }

    public void setDeletedRequirements(List<AssessmentWrapper> deletedRequirements) {
        this.deletedRequirements = deletedRequirements;
    }

    public Integer getProfessionId() {
        return professionId;
    }

    public void setProfessionId(Integer professionId) {
        this.professionId = professionId;
    }

    public static class AssessmentWrapper{
        private Double weight;
        private Integer skillId;

        public AssessmentWrapper(){}

        public Double getWeight() {
            return weight;
        }

        public void setWeight(Double weight) {
            this.weight = weight;
        }

        public Integer getSkillId() {
            return skillId;
        }

        public void setSkillId(Integer skillId) {
            this.skillId = skillId;
        }
    }
}
