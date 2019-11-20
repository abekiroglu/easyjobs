package com.easyjobs.api.dto.request;

import com.easyjobs.api.model.Assessment;
import com.easyjobs.api.model.Comment;
import com.easyjobs.api.model.Company;
import com.easyjobs.api.model.Profession;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class AdvertisementCreateRequest {
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date publishDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    private List<AssessmentWrapper> requirements;
    private Integer professionId;

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

    public List<AssessmentWrapper> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<AssessmentWrapper> requirements) {
        this.requirements = requirements;
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
