package com.easyjobs.api.repository;

import com.easyjobs.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findOneByEmail(String email);
    User findOneByEmailAndIsDeleted(String email, boolean isDeleted);
    User findOneByIdAndIsDeleted(Integer email, boolean isDeleted);
    List<User> findAllByProfessionId(Integer professionId);
    @Query(value = "SELECT COUNT(*) FROM app_user", nativeQuery = true)
    long findCount();
}
