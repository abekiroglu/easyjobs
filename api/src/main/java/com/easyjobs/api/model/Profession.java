package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "profession")
public class Profession extends BaseModel{
    private String title;
    private String description;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "profession_skills",
            joinColumns = { @JoinColumn(name = "profession_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_id") })
    private List<Skill> skills;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference(value="advertisement_profession")
    private List<Advertisement> advertisements;

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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Advertisement> getAdvertisements() {
        return advertisements;
    }

    public void setAdvertisements(List<Advertisement> advertisements) {
        this.advertisements = advertisements;
    }
}
