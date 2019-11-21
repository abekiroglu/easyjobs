package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.Company;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class SimpleCompany {
    private int id;
    private String email;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date foundedDate;
    private String name;
    private String description;
    private String picture;

    public SimpleCompany(Company company){
        this.id = company.getId();
        this.email = company.getEmail();
        this.foundedDate = company.getFoundedDate();
        this.name = company.getName();
        this.description = company.getDescription();
        this.picture = company.getPicture();
    }

    public SimpleCompany(int id, String email, Date foundedDate, String name, String description) {
        this.id = id;
        this.email = email;
        this.foundedDate = foundedDate;
        this.name = name;
        this.description = description;
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
}
