package com.easyjobs.api.repository;

import com.easyjobs.api.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findOneByEmail(String email);

    Company findOneById(int id);

    Company findOneByIdAndIsDeleted(Integer id, boolean isDeleted);

    Company findOneByEmailAndIsDeleted(String email, boolean b);

    @Query(value = "SELECT COUNT(*) FROM company", nativeQuery = true)
    long findCount();
}
