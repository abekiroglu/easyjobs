package com.easyjobs.api.repository;

import com.easyjobs.api.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findOneByEmail(String email);

    Company findOneById(int id);

    Company findOneByIdAndIsDeleted(Integer id, boolean isDeleted);

    Company findOneByEmailAndIsDeleted(String email, boolean b);
}
