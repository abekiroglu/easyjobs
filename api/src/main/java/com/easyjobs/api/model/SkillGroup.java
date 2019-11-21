package com.easyjobs.api.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "skill_group")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SkillGroup extends BaseModel {
    private String description;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "skill_group_skills",
            joinColumns = { @JoinColumn(name = "group_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_id") })
    private List<Skill> skills;

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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
