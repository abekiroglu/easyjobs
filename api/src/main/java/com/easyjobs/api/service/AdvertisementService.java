package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.AdvertisementCreateRequest;
import com.easyjobs.api.dto.request.AdvertisementUpdateRequest;
import com.easyjobs.api.dto.response.*;
import com.easyjobs.api.model.*;
import com.easyjobs.api.repository.*;
import com.easyjobs.api.security.EasyJobsUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
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
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository,
                                CompanyRepository companyRepository,
                                ProfessionRepository professionRepository,
                                UserRepository userRepository,
                                AssessmentRepository assessmentRepository,
                                SkillRepository skillRepository,
                                JobApplicationRepository jobApplicationRepository) {
        this.advertisementRepository = advertisementRepository;
        this.companyRepository = companyRepository;
        this.professionRepository = professionRepository;
        this.userRepository = userRepository;
        this.assessmentRepository = assessmentRepository;
        this.skillRepository = skillRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }


    public ResponseEntity createAdvertisement(AdvertisementCreateRequest request, String email) {
        Advertisement advertisement = new Advertisement();
        try {
            Profession profession = professionRepository.findOneById(request.getProfessionId());
            Company company = companyRepository.findOneByEmail(email);
            advertisement.setTitle(request.getTitle());
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
                return new Response<>(new AdvertisementResponse(advertisement), HttpStatus.OK);
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
                        request.getDeletedRequirements().forEach(deletedAssessment -> assessments.removeIf(
                                assessment -> assessment.getSkill().getId() == deletedAssessment.getSkillId()));
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
            User user =  userRepository.findOneByEmail(authentication.getName());
            if (companyId != null && id != null) {
                return new Response<>(new ErrorResponse("409", "Too many parameters"), HttpStatus.CONFLICT);
            } else if (id != null) {
                Advertisement dbAdvertisement = advertisementRepository.findOneById(id);
                if(dbAdvertisement.getValidUntil().toInstant().isAfter(Instant.now()) && !dbAdvertisement.getDeleted()){
                    return new Response<>(new SimpleAdvertisement(dbAdvertisement, user.getSkills()), HttpStatus.OK);
                }else{
                    return new Response<>(null, HttpStatus.OK);
                }
            } else if (companyId != null) {
                return new Response<>(companyRepository.findOneById(companyId).getAdvertisements().stream()
                        .filter(advertisement -> !advertisement.getDeleted() && advertisement.getValidUntil().toInstant().isAfter(Instant.now()))
                        .map(advertisement -> new SimpleAdvertisement(advertisement, user.getSkills())).collect(Collectors.toList()), HttpStatus.OK);
            } else {
                //TODO match users skills with the ad requirements
                List<Advertisement> advertisements = user.getProfession().getAdvertisements();

                List<SimpleAdvertisement> response = advertisements.stream()
                        .filter(advertisement -> !advertisement.getDeleted() && advertisement.getValidUntil().toInstant().isAfter(Instant.now()))
                        .map(advertisement -> new SimpleAdvertisement(advertisement, user.getSkills())).collect(Collectors.toList());
                response.removeIf(ad -> ad.getMatchRate() <= 0.5 || ad.getMatchRate().isNaN());
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
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity applyForJob(String advertisementId, Authentication authentication) {
        try {
            if(((EasyJobsUser)authentication.getPrincipal()).getType().equals(Company.class)){
                return new Response<>(new ErrorResponse("500", "Authenticated person must be a user"), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Advertisement advertisement = advertisementRepository.findOneByIdAndIsDeleted(Integer.parseInt(advertisementId),false);
            if(advertisement == null){
                return new Response<>(new ErrorResponse("500", String.format("Advertisement with id: %s not found", advertisementId)), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            User dbUser = userRepository.findOneByEmail(authentication.getName());

            JobApplication jobApplication = new JobApplication();
            jobApplication.setApplicant(dbUser);
            jobApplication.setAppliedTo(advertisement.getCompany());
            jobApplication.setPostDate(new Date());
            jobApplication.setResolved(false);
            jobApplication.setAdvertisementId(advertisement.getId());
            //TODO Enumerate
            jobApplication.setIssuedBy("User");

            advertisement.getCompany().getApplications().add(jobApplication);
            dbUser.getApplications().add(jobApplication);
            jobApplication = jobApplicationRepository.save(jobApplication);

            return new Response<>(jobApplication, HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getRecommendedUsers(String advertisementId, Authentication auth) {
        try {
            if(!((EasyJobsUser) auth.getPrincipal()).getType().equals(Company.class)){
                return new Response<>(new ErrorResponse("401", "Authorized user is not a company"), HttpStatus.UNAUTHORIZED);
            }
            Advertisement dbAdvertisement = advertisementRepository.findOneByIdAndIsDeleted(Integer.parseInt(advertisementId), false);
            if(dbAdvertisement == null){
                return new Response<>(new ErrorResponse("404", "Advertisement not found"), HttpStatus.NOT_FOUND);
            }
            if(!dbAdvertisement.getCompany().getEmail().equals(auth.getName())){
                return new Response<>(new ErrorResponse("401", "Advertisement does not belong to the authenticated user"), HttpStatus.UNAUTHORIZED);
            }

            List<User> users = userRepository.findAllByProfessionId(dbAdvertisement.getProfession().getId());
            List<RecommendedUser> response = users.stream().map(user -> new RecommendedUser(user, dbAdvertisement.getRequirements())).collect(Collectors.toList());
            response.removeIf(user -> user.getMatchRate() <= 0.5 || user.getMatchRate().isNaN());

            return new Response<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
