package com.easyjobs.api.dto.request;

import com.easyjobs.api.model.Comment;
import com.easyjobs.api.model.Experience;
import com.easyjobs.api.model.Skill;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class UserUpdateRequest {
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date birthDate;
    private String name;
    private String surname;
    private Integer profession;
    private List<ExperienceWrapper> newExperiences;
    private List<ExperienceWrapper> deletedExperiences;
    private List<Skill> newSkills;
    private List<Skill> deletedSkills;

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

    public Integer getProfession() {
        return profession;
    }

    public void setProfession(Integer profession) {
        this.profession = profession;
    }

    public List<ExperienceWrapper> getNewExperiences() {
        return newExperiences;
    }

    public void setNewExperiences(List<ExperienceWrapper> newExperiences) {
        this.newExperiences = newExperiences;
    }

    public List<ExperienceWrapper> getDeletedExperiences() {
        return deletedExperiences;
    }

    public void setDeletedExperiences(List<ExperienceWrapper> deletedExperiences) {
        this.deletedExperiences = deletedExperiences;
    }

    public List<Skill> getNewSkills() {
        return newSkills;
    }

    public void setNewSkills(List<Skill> newSkills) {
        this.newSkills = newSkills;
    }

    public List<Skill> getDeletedSkills() {
        return deletedSkills;
    }

    public void setDeletedSkills(List<Skill> deletedSkills) {
        this.deletedSkills = deletedSkills;
    }

    public static class ExperienceWrapper{
        private Integer id;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date startDate;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date endDate;
        private Integer companyId;
        private Integer professionId;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Date getStartDate() {
            return startDate;
        }

        public void setStartDate(Date startDate) {
            this.startDate = startDate;
        }

        public Date getEndDate() {
            return endDate;
        }

        public void setEndDate(Date endDate) {
            this.endDate = endDate;
        }

        public Integer getCompanyId() {
            return companyId;
        }

        public void setCompanyId(Integer companyId) {
            this.companyId = companyId;
        }

        public Integer getProfessionId() {
            return professionId;
        }

        public void setProfessionId(Integer professionId) {
            this.professionId = professionId;
        }
    }
}
