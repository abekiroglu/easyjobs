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
public class AdvertisementService {
    private AdvertisementRepository advertisementRepository;
    private CompanyRepository companyRepository;
    private ProfessionRepository professionRepository;
    private UserRepository userRepository;

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository,
                           CompanyRepository companyRepository,
                           ProfessionRepository professionRepository,
                           UserRepository userRepository){
        this.advertisementRepository = advertisementRepository;
        this.companyRepository= companyRepository;
        this.professionRepository= professionRepository;
        this.userRepository= userRepository;
    }


    public ResponseEntity createAdvertisement(Advertisement advertisement, String email) {
        try {
            advertisement.setCompany(companyRepository.findOneByEmail(email));
            advertisement.setProfession(professionRepository.findOneById(advertisement.getProfession().getId()));
            return new Response<>(advertisementRepository.save(advertisement), HttpStatus.CREATED);
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisement(String advertisementId, String email) {
        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                return new Response<>(advertisement, HttpStatus.OK);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateAdvertisement(Advertisement advertisement, String advertisementId, String email) {
        Advertisement dbAdvertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                dbAdvertisement.setDescription(advertisement.getDescription());
                dbAdvertisement.setRequirements(advertisement.getRequirements());
                dbAdvertisement.setValidUntil(advertisement.getValidUntil());
                return new Response<>(advertisementRepository.save(dbAdvertisement), HttpStatus.OK);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteAdvertisement(String advertisementId, String email) {
        Advertisement advertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
        try {
            if(email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                advertisement.setDeleted(true);
                advertisementRepository.save(advertisement);
                return new Response<>(null, HttpStatus.NO_CONTENT);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity searchAdvertisements(Integer id, Integer companyId, String email) {
        try {
            if (companyId != null && id != null) {
                return new Response<>(new ErrorResponse("409", "Too many parameters"), HttpStatus.CONFLICT);
            }else if(id != null) {
                return new Response<>(advertisementRepository.findOneById(id), HttpStatus.OK);
            }else if(companyId != null) {
                return new Response<>(companyRepository.findOneById(companyId).getAdvertisements(), HttpStatus.OK);
            }else {
                List<Advertisement> advertisements = userRepository.findOneByEmail(email).getProfession().getAdvertisements();
                return new Response<>(advertisements, HttpStatus.OK);
            }
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisementDetails(Integer advertisementId) {
        try {
            return new Response<>(advertisementRepository.findOneById(advertisementId), HttpStatus.OK);
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("0", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity applyForJob(String advertisementId) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity hireAUser(String advertisementId, String auth) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getRecommendedUsers(String advertisementId, String auth) {
        try {
            return null;
        }catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getProfessions() {
        List<Profession> professions = professionRepository.findAll();
        List<SimpleProfession> response = professions.stream().map(SimpleProfession::new).collect(Collectors.toList());
        return new Response<>(response, HttpStatus.OK);
    }
}
