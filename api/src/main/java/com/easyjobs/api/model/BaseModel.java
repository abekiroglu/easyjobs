package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public class BaseModel {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public int id;
    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    public Date createdAt = new Date();
    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    public Date updatedAt = new Date();

    private Boolean isDeleted = false;

    public int getId() {
        return id;
    }

    public void setId(int ID) {
        this.id = ID;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @JsonIgnore
    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}

