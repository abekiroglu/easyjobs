package com.easyjobs.api.dto.response;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.model.Skill;
import com.easyjobs.api.model.SkillGroup;

import java.util.List;

public class SimpleProfession {

    private int id;
    private String title;
    private String description;
    private List<SkillGroup> skills;

    public SimpleProfession(int id, String title, String description, List<SkillGroup> skills) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.skills = skills;
    }

    public SimpleProfession(Profession profession){
        this.id = profession.getId();
        this.title = profession.getTitle();
        this.description = profession.getDescription();
        this.skills = profession.getSkillGroups();
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

    public List<SkillGroup> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillGroup> skills) {
        this.skills = skills;
    }
}
