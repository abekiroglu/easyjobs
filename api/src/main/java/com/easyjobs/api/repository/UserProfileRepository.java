package com.easyjobs.api.repository;

import com.easyjobs.api.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
}
