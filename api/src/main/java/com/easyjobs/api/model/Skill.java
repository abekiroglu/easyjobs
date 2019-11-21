package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "skill")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Skill extends BaseModel{
    private String description;
    //TODO: Use AWS EC3 to store images.
    // private URI picture

    @Override
    public int getId() {
        return super.getId();
    }

    @Override
    public void setId(int ID) {
        super.setId(ID);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
