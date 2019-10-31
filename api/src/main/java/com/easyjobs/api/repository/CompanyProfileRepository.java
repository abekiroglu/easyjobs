package com.easyjobs.api.repository;

import com.easyjobs.api.model.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Integer> {
}
