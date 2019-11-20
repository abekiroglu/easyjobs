package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.AdvertisementCreateRequest;
import com.easyjobs.api.dto.request.AdvertisementUpdateRequest;
import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.dto.response.SimpleAdvertisement;
import com.easyjobs.api.dto.response.SimpleProfession;
import com.easyjobs.api.model.*;
import com.easyjobs.api.repository.*;
import com.easyjobs.api.security.EasyJobsUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class AdvertisementService {
    private AdvertisementRepository advertisementRepository;
    private CompanyRepository companyRepository;
    private ProfessionRepository professionRepository;
    private UserRepository userRepository;
    private AssessmentRepository assessmentRepository;
    private SkillRepository skillRepository;

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository,
                                CompanyRepository companyRepository,
                                ProfessionRepository professionRepository,
                                UserRepository userRepository,
                                AssessmentRepository assessmentRepository,
                                SkillRepository skillRepository) {
        this.advertisementRepository = advertisementRepository;
        this.companyRepository = companyRepository;
        this.professionRepository = professionRepository;
        this.userRepository = userRepository;
        this.assessmentRepository = assessmentRepository;
        this.skillRepository = skillRepository;
    }


    public ResponseEntity createAdvertisement(AdvertisementCreateRequest request, String email) {
        Advertisement advertisement = new Advertisement();
        try {
            Profession profession = professionRepository.findOneById(request.getProfessionId());
            Company company = companyRepository.findOneByEmail(email);
            advertisement.setValidUntil(request.getValidUntil());
            advertisement.setDescription(request.getDescription());
            advertisement.setProfession(profession);
            advertisement.setCompany(company);
            advertisement.setPublishDate(request.getPublishDate());

            List<Assessment> assessments = new ArrayList<>();
            request.getRequirements().forEach(assessmentWrapper ->
                    assessments.add(new Assessment(assessmentWrapper.getWeight(),
                            skillRepository.findOneById(assessmentWrapper.getSkillId()))));
            advertisement.setRequirements(assessments);

            advertisement = advertisementRepository.save(advertisement);

            company.getAdvertisements().add(advertisement);
            profession.getAdvertisements().add(advertisement);

            return new Response<>(advertisement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisement(String advertisementId, String email) {
        Advertisement advertisement = advertisementRepository.findOneByIdAndIsDeleted(Integer.parseInt(advertisementId), false);
        if (advertisement == null) {
            return new Response<>(new ErrorResponse("404", "Advertisement does not exist or got deleted"), HttpStatus.NOT_FOUND);
        }
        try {
            if (email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                return new Response<>(advertisement, HttpStatus.OK);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateAdvertisement(AdvertisementUpdateRequest request, String advertisementId, Authentication authentication) {

        try {
            Advertisement dbAdvertisement = advertisementRepository.findOneById(Integer.parseInt(advertisementId));
            if (dbAdvertisement == null) {
                return new Response<>(new ErrorResponse("404", "Advertisement does not exist"), HttpStatus.NOT_FOUND);
            }
            // If authenticated person is a user
            if (((EasyJobsUser) authentication.getPrincipal()).getType().equals(User.class)) {
                // User can add or delete their comments
                if (request.getNewComments() != null && request.getNewComments().size() != 0) {
                    dbAdvertisement.getComments().addAll(request.getNewComments());
                }
                if (request.getDeletedComments() != null && request.getDeletedComments().size() != 0) {
                    List<Comment> comments = dbAdvertisement.getComments();
                    //TODO check if the comment belongs to the user
                    request.getDeletedComments().forEach(removedComment -> comments.removeIf(comment -> comment.getId() == removedComment.getId()));
                }
                // If authenticated user is a company
            } else {
                // If the advertisement belongs to the company
                if (dbAdvertisement.getCompany().getEmail().equals(authentication.getName())) {

                    if (request.getNewRequirements() != null && request.getNewRequirements().size() != 0) {
                        List<Assessment> assessments = new ArrayList<>();
                        request.getNewRequirements().forEach(assessmentWrapper ->
                                assessments.add(new Assessment(assessmentWrapper.getWeight(),
                                        skillRepository.findOneById(assessmentWrapper.getSkillId()))));
                        dbAdvertisement.getRequirements().addAll(assessments);
                    }
                    if (request.getDeletedRequirements() != null && request.getDeletedRequirements().size() != 0) {
                        List<Assessment> assessments = dbAdvertisement.getRequirements();
                        request.getDeletedRequirements().forEach(deletedAssesment -> assessments.removeIf(
                                assessment -> assessment.getSkill().getId() == deletedAssesment.getSkillId()));
                    }
                    if (request.getDescription() != null) {
                        dbAdvertisement.setDescription(request.getDescription());
                    }
                    if (request.getValidUntil() != null) {
                        dbAdvertisement.setValidUntil(request.getValidUntil());
                    }
                    if (request.getProfessionId() != null) {
                        Profession profession = professionRepository.findOneById(request.getProfessionId());
                        if (profession != null) {
                            dbAdvertisement.setProfession(profession);
                            dbAdvertisement = advertisementRepository.save(dbAdvertisement);
                            profession.getAdvertisements().add(dbAdvertisement);
                        } else {
                            return new Response<>(new ErrorResponse("404", String.format("Profession with id:%s not found", request.getProfessionId())), HttpStatus.NOT_FOUND);
                        }
                    }
                } else {
                    return new Response<>(new ErrorResponse("401", "Advertisement does not belong to the authenticated company"), HttpStatus.UNAUTHORIZED);
                }
            }
            return new Response<>(advertisementRepository.save(dbAdvertisement), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteAdvertisement(String advertisementId, String email) {
        Advertisement advertisement = advertisementRepository.findOneByIdAndIsDeleted(Integer.parseInt(advertisementId), false);
        if (advertisement == null) {
            return new Response<>(new ErrorResponse("404", "Advertisement does not exist or got deleted"), HttpStatus.NOT_FOUND);
        }
        try {
            if (email.equalsIgnoreCase(advertisement.getCompany().getEmail())) {
                advertisement.setDeleted(true);
                advertisementRepository.save(advertisement);
                return new Response<>(null, HttpStatus.NO_CONTENT);
            } else {
                return new Response<>(new ErrorResponse("500", "Advertisement does not belong to the authenticated company"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity searchAdvertisements(Integer id, Integer companyId, Authentication authentication) {
        if (!((EasyJobsUser) authentication.getPrincipal()).getType().equals(User.class)) {
            return new Response<>(new ErrorResponse("401", "Authenticated user should not be a company"), HttpStatus.UNAUTHORIZED);
        }
        try {
            if (companyId != null && id != null) {
                return new Response<>(new ErrorResponse("409", "Too many parameters"), HttpStatus.CONFLICT);
            } else if (id != null) {
                return new Response<>(advertisementRepository.findOneById(id), HttpStatus.OK);
            } else if (companyId != null) {
                return new Response<>(companyRepository.findOneById(companyId).getAdvertisements(), HttpStatus.OK);
            } else {
                //TODO match users skills with the ad requirements
                List<Advertisement> advertisements = userRepository.findOneByEmail(authentication.getName()).getProfession().getAdvertisements();
                List<SimpleAdvertisement> response = advertisements.stream().map(SimpleAdvertisement::new).collect(Collectors.toList());
                return new Response<>(response, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getAdvertisementDetails(Integer advertisementId) {
        try {
            return new Response<>(advertisementRepository.findOneById(advertisementId), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("0", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity applyForJob(String advertisementId) {
        try {
            return null;
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity hireAUser(String advertisementId, String auth) {
        try {
            return null;
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getRecommendedUsers(String advertisementId, String auth) {
        try {
            return null;
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getProfessions() {
        List<Profession> professions = professionRepository.findAll();
        List<SimpleProfession> response = professions.stream().map(SimpleProfession::new).collect(Collectors.toList());
        return new Response<>(response, HttpStatus.OK);
    }
}
