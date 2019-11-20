package com.easyjobs.api.dto.response;

import com.easyjobs.api.model.Advertisement;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class SimpleAdvertisement {
    private int id;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date publishDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date validUntil;
    private String description;
    private SimpleCompany company;

    public SimpleAdvertisement(Advertisement advertisement){
        this.id = advertisement.getId();
        this.publishDate = advertisement.getPublishDate();
        this.validUntil = advertisement.getValidUntil();
        this.description = advertisement.getDescription();
        this.company = new SimpleCompany(advertisement.getCompany());
    }

    public SimpleAdvertisement(int id, Date publishDate, Date validUntil, String description, SimpleCompany company) {
        this.id = id;
        this.publishDate = publishDate;
        this.validUntil = validUntil;
        this.description = description;
        this.company = company;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public SimpleCompany getCompany() {
        return company;
    }

    public void setCompany(SimpleCompany company) {
        this.company = company;
    }
}
