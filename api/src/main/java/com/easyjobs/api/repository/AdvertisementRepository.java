package com.easyjobs.api.repository;

import com.easyjobs.api.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Integer> {
    Advertisement findOneById(int id);
    Advertisement findOneByIdAndIsDeleted(int id, boolean isDeleted);
    @Query(value = "SELECT COUNT(*) FROM advertisement", nativeQuery = true)
    long findCount();
}
