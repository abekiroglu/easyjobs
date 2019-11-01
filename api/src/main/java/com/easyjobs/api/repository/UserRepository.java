package com.easyjobs.api.repository;

import com.easyjobs.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByUsername(String username);

    User findOneByEmail(String email);
}
