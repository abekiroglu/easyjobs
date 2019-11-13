package com.easyjobs.api.repository;

import com.easyjobs.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByEmail(String email);
}
