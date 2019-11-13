package com.easyjobs.api.repository;

import com.easyjobs.api.model.Profession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionRepository extends JpaRepository<Profession, Integer> {
    Profession findOneById(Integer id);
}
