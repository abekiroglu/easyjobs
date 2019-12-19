package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.ApplicationUpdateRequest;
import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.dto.request.CompanyUpdateRequest;
import com.easyjobs.api.dto.response.*;
import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.*;
import com.easyjobs.api.repository.AdvertisementRepository;
import com.easyjobs.api.repository.CompanyRepository;
import com.easyjobs.api.repository.JobApplicationRepository;
import com.easyjobs.api.repository.UserRepository;
import com.easyjobs.api.security.EasyJobsUser;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class CompanyService {

    private AdvertisementRepository advertisementRepository;
    private CompanyRepository companyRepository;
    private JobApplicationRepository jobApplicationRepository;
    private UserRepository userRepository;
    private FirebaseApp firebaseApp;

    @Autowired
    public CompanyService(CompanyRepository companyRepository,
                          FirebaseApp firebaseApp,
                          AdvertisementRepository advertisementRepository,
                          JobApplicationRepository jobApplicationRepository,
                          UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.firebaseApp = firebaseApp;
        this.advertisementRepository = advertisementRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity registerCompany(CompanySignupRequest request) {
        try {
            //Create a request for Firebase
            UserRecord.CreateRequest firebaseRequest = new UserRecord.CreateRequest()
                    .setEmail(request.getEmail())
                    .setEmailVerified(true)
                    .setPassword(request.getPassword())
                    .setDisplayName(request.getName())
                    .setDisabled(false);
            // Send request to Firebase
            UserRecord companyRecord = FirebaseAuth.getInstance(firebaseApp).createUser(firebaseRequest);
            // Generate a verification link and send a verification email with SendGrid
            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(companyRecord.getEmail());
            //TODO email structure instead of passing verification link
            SendGridUtil.send(companyRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
            // Create user entity in DB
            Company company = new Company();
            company.setEmail(request.getEmail());
            company.setValidated(false);
            company.setLastActionTime(Instant.now().getEpochSecond());
            companyRepository.save(company);
            return new Response<>(companyRecord, HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity getCompanyMe(String email) {
        Company dbCompany = companyRepository.findOneByEmail(email);

        try {
            return new Response<>(new CompanyResponse(dbCompany), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getCompanyProfile(String companyId) {
        return new Response<>(companyRepository.findOneByIdAndIsDeleted(Integer.parseInt(companyId), false), HttpStatus.OK);
    }

    public ResponseEntity updateCompany(CompanyUpdateRequest request, Authentication authentication, String companyId) {
        try {
            Company dbCompany = companyRepository.findOneById(Integer.parseInt(companyId));
            if (dbCompany == null) {
                return new Response<>(new ErrorResponse("404", "Company does not exist"), HttpStatus.NOT_FOUND);
            }
            // If authenticated person is a user
            if (((EasyJobsUser) authentication.getPrincipal()).getType().equals(User.class)) {
                // User can add or delete their comments
                if (request.getNewComments() != null && request.getNewComments().size() != 0) {
                    dbCompany.getComments().addAll(request.getNewComments());
                }
                if (request.getDeletedComments() != null && request.getDeletedComments().size() != 0) {
                    List<Comment> comments = dbCompany.getComments();
                    request.getDeletedComments().forEach(removedComment -> comments.removeIf(comment -> comment.getId() == removedComment.getId()));
                }
                //If authenticated person is a company
            } else {
                // If the advertisement belongs to the company
                if (dbCompany.getEmail().equals(authentication.getName())) {
                    if (request.getDescription() != null) {
                        dbCompany.setDescription(request.getDescription());
                    }
                    if (request.getFoundedDate() != null) {
                        dbCompany.setFoundedDate(request.getFoundedDate());
                    }
                    if (request.getName() != null) {
                        dbCompany.setName(request.getName());
                    }
                } else {
                    return new Response<>(new ErrorResponse("401", "Advertisement does not belong to the authenticated company"), HttpStatus.UNAUTHORIZED);
                }
            }
            return new Response<>(companyRepository.save(dbCompany), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteCompany(String auth) {
        try {

            FirebaseToken token = FirebaseUtil.decodeToken(auth);

            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid()).setDisabled(true);
            FirebaseAuth.getInstance(firebaseApp).updateUser(request);

            Company company = companyRepository.findOneByEmail(token.getEmail());
            company.setDeleted(true);

            return new Response<>(null, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Response updateImageUrl(Response response, String email) {
        if(response.getBody().getClass().equals(String.class)){
            Company dbUser = companyRepository.findOneByEmailAndIsDeleted(email, false);
            if(dbUser == null){
                return new Response<>(new ErrorResponse("404", "User not found"), HttpStatus.NOT_FOUND);
            }
            dbUser.setPicture((String) response.getBody());
        }

        return response;
    }


    public ResponseEntity hireAUser(Integer advertisementId, Integer userId, Authentication auth) {
        try {
            if(advertisementId == null || userId == null){
            return new Response<>(new ErrorResponse("400", "Parameters should not be empty"), HttpStatus.BAD_REQUEST);
            }
            if(!((EasyJobsUser) auth.getPrincipal()).getType().equals(Company.class)){
                return new Response<>(new ErrorResponse("401", "Authorized user is not a company"), HttpStatus.UNAUTHORIZED);
            }
            Advertisement dbAdvertisement = advertisementRepository.findOneByIdAndIsDeleted(advertisementId, false);
            if(dbAdvertisement == null){
                return new Response<>(new ErrorResponse("404", "Advertisement not found"), HttpStatus.NOT_FOUND);
            }
            if(!dbAdvertisement.getCompany().getEmail().equals(auth.getName())){
                return new Response<>(new ErrorResponse("401", "Advertisement does not belong to the authenticated user"), HttpStatus.UNAUTHORIZED);
            }
            User dbUser = userRepository.findOneByIdAndIsDeleted(userId, false);
            if(dbUser == null){
                return new Response<>(new ErrorResponse("404", "User not found"), HttpStatus.NOT_FOUND);
            }

            JobApplication jobApplication = new JobApplication();
            jobApplication.setResolved(false);
            jobApplication.setAccepted(false);
            jobApplication.setPostDate(new Date());
            jobApplication.setAppliedTo(dbAdvertisement.getCompany());
            jobApplication.setApplicant(dbUser);
            jobApplication.setAdvertisementId(dbAdvertisement.getId());
            jobApplication.setMatchRate(RecommendedUser.calculateMatchRate(dbUser.getSkills(), dbAdvertisement.getRequirements()));
            //TODO Enumerate
            jobApplication.setIssuedBy("Company");

            dbAdvertisement.getCompany().getApplications().add(jobApplication);
            dbUser.getApplications().add(jobApplication);
            jobApplication = jobApplicationRepository.save(jobApplication);

            return new Response<>(jobApplication, HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity getCompanyApplications(String name) {
        try {
            Company dbCompany = companyRepository.findOneByEmail(name);
            //.filter(jobApplication -> !jobApplication.isResolved() && !jobApplication.getDeleted())
            return new Response<>(dbCompany.getApplications().stream().map(CompanyResponse.JobApplicationWrapper::new).collect(Collectors.toList()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getCompanyAdvertisements(String name) {
        try {
            Company dbCompany = companyRepository.findOneByEmail(name);

            return new Response<>(dbCompany.getAdvertisements().stream().filter(ad -> !ad.getDeleted()), HttpStatus.CREATED);
        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateApplication(Integer applicationId, ApplicationUpdateRequest request, String email) {
        try {
            JobApplication dbApplication = jobApplicationRepository.findOneById(applicationId);
            if(dbApplication.getAppliedTo().getEmail().equals(email)){
                if(request.getIsResolved()){
                    dbApplication.setResolved(true);
                    dbApplication.setAccepted(request.getIsAccepted());
                }
                if(request.getFeedback() != null){
                    dbApplication.setFeedback(request.getFeedback());
                }
                return new Response<>(new CompanyResponse.JobApplicationWrapper(dbApplication), HttpStatus.OK);
            }
            else {
                return new Response<>(new ErrorResponse("404", "Application does not belong to the authenticated company"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new Response<>(new ErrorResponse("500", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
