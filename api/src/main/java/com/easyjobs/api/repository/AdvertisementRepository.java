package com.easyjobs.api.repository;

import com.easyjobs.api.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Integer> {
    Advertisement findOneById(int id);
    Advertisement findOneByIdAndIsDeleted(int id, boolean isDeleted);
}
