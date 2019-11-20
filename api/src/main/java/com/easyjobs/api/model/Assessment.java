package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "assessment")
public class Assessment extends BaseModel{
    private Double weight;
    @ManyToMany(fetch = FetchType.LAZY, cascade =CascadeType.ALL)
    @JoinTable(name = "assessment_skills",
            joinColumns = { @JoinColumn(name = "assessment_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_id") })
    private List<Skill> skills;

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
