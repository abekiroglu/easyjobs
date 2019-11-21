package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "profession")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Profession extends BaseModel{
    private String title;
    private String description;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "profession_skills",
            joinColumns = { @JoinColumn(name = "profession_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_group_id") })
    private List<SkillGroup> skillGroups;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference(value="advertisement_profession")
    private List<Advertisement> advertisements;

    @Override
    public int getId() {
        return super.getId();
    }

    @Override
    public void setId(int ID) {
        super.setId(ID);
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

    public List<SkillGroup> getSkillGroups() {
        return skillGroups;
    }

    public void setSkillGroups(List<SkillGroup> skillGroups) {
        this.skillGroups = skillGroups;
    }

    public List<Advertisement> getAdvertisements() {
        return advertisements;
    }

    public void setAdvertisements(List<Advertisement> advertisements) {
        this.advertisements = advertisements;
    }
}
