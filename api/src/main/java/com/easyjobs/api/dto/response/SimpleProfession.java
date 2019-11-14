package com.easyjobs.api.dto.response;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.model.Skill;
import java.util.List;

public class SimpleProfession {

    private String title;
    private String description;
    private List<Skill> skills;

    public SimpleProfession(String title, String description, List<Skill> skills) {
        this.title = title;
        this.description = description;
        this.skills = skills;
    }

    public SimpleProfession(Profession profession){
        this.title = profession.getTitle();
        this.description = profession.getDescription();
        this.skills = profession.getSkills();
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

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
