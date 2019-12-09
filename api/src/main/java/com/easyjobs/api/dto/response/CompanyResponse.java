package com.easyjobs.api.dto.response;

import com.easyjobs.api.dto.request.UserUpdateRequest;
import com.easyjobs.api.model.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class CompanyResponse {
    private int id;
    private String email;
    private boolean isValidated;
    private List<JobApplicationWrapper> applications;
    private List<Comment> comments;
    private List<Advertisement> advertisements;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date foundedDate;
    private String name;
    private String description;
    private String picture;

    public CompanyResponse(Company company) {
        this.id = company.getId();
        this.email = company.getEmail();
        this.isValidated = company.isValidated();
        this.applications = company.getApplications().stream().map(JobApplicationWrapper::new).collect(Collectors.toList());
        this.comments = company.getComments();
        this.advertisements = company.getAdvertisements();
        this.foundedDate = company.getFoundedDate();
        this.name = company.getName();
        this.description = company.getDescription();
        this.picture = company.getPicture();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isValidated() {
        return isValidated;
    }

    public void setValidated(boolean validated) {
        isValidated = validated;
    }

    public List<JobApplicationWrapper> getApplications() {
        return applications;
    }

    public void setApplications(List<JobApplicationWrapper> applications) {
        this.applications = applications;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Advertisement> getAdvertisements() {
        return advertisements;
    }

    public void setAdvertisements(List<Advertisement> advertisements) {
        this.advertisements = advertisements;
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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public static class JobApplicationWrapper{
        private int id;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date postDate;
        private boolean isResolved;
        private UserWrapper applicant;
        private String issuedBy;
        private int advertisementId;


        public JobApplicationWrapper(JobApplication jobApplication) {
            this.id = jobApplication.getId();
            this.postDate = jobApplication.getPostDate();
            this.isResolved = jobApplication.isResolved();
            this.applicant = new UserWrapper(jobApplication.getApplicant());
            this.issuedBy = jobApplication.getIssuedBy();
            this.advertisementId = jobApplication.getAdvertisementId();
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
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

        public UserWrapper getApplicant() {
            return applicant;
        }

        public void setApplicant(UserWrapper applicant) {
            this.applicant = applicant;
        }

        public String getIssuedBy() {
            return issuedBy;
        }

        public void setIssuedBy(String issuedBy) {
            this.issuedBy = issuedBy;
        }

        public int getAdvertisementId() {
            return advertisementId;
        }

        public void setAdvertisementId(int advertisementId) {
            this.advertisementId = advertisementId;
        }
    }

    public static class ProfessionWrapper{
        private int id;
        private String title;
        private String description;
        public ProfessionWrapper(Profession profession){
            this.id = profession.getId();
            this.title = profession.getTitle();
            this.description = profession.getDescription();
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

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class ExperienceWrapper{
        private int id;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date startDate;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date endDate;
        private String company;
        private String profession;

        public ExperienceWrapper(Experience experience) {
            this.id = experience.getId();
            this.startDate = experience.getStartDate();
            this.endDate = experience.getEndDate();
            this.company = experience.getCompany().getName();
            this.profession = experience.getProfession().getTitle();
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
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

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getProfession() {
            return profession;
        }

        public void setProfession(String profession) {
            this.profession = profession;
        }
    }

    public static class UserWrapper{
        private int id;
        private String email;
        @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
        private Date birthDate;
        private String name;
        private String surname;
        private ProfessionWrapper profession;
        private List<Skill> skills;
        @JsonManagedReference(value="user_experience")
        private List<ExperienceWrapper> experiences;
        private String picture;

        public UserWrapper(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.birthDate = user.getBirthDate();
            this.name = user.getName();
            this.surname = user.getSurname();
            this.profession = new ProfessionWrapper(user.getProfession());
            this.skills = user.getSkills();
            this.experiences = user.getExperiences().stream().map(ExperienceWrapper::new).collect(Collectors.toList());
            this.picture = user.getPicture();
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

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

        public ProfessionWrapper getProfession() {
            return profession;
        }

        public void setProfession(ProfessionWrapper profession) {
            this.profession = profession;
        }

        public List<Skill> getSkills() {
            return skills;
        }

        public void setSkills(List<Skill> skills) {
            this.skills = skills;
        }

        public List<ExperienceWrapper> getExperiences() {
            return experiences;
        }

        public void setExperiences(List<ExperienceWrapper> experiences) {
            this.experiences = experiences;
        }

        public String getPicture() {
            return picture;
        }

        public void setPicture(String picture) {
            this.picture = picture;
        }
    }
}
