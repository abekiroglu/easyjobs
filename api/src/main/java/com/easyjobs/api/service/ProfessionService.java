package com.easyjobs.api.service;

import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.dto.response.SimpleProfession;
import com.easyjobs.api.model.Advertisement;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.repository.AdvertisementRepository;
import com.easyjobs.api.repository.CompanyRepository;
import com.easyjobs.api.repository.ProfessionRepository;
import com.easyjobs.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ProfessionService {
    private ProfessionRepository professionRepository;

    @Autowired
    public ProfessionService(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }


    public ResponseEntity getProfessions() {
        List<Profession> professions = professionRepository.findAll();
        List<SimpleProfession> response = professions.stream().map(SimpleProfession::new).collect(Collectors.toList());
        return new Response<>(response, HttpStatus.OK);
    }
}
