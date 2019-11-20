package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.dto.request.CompanyUpdateRequest;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.Company;
import com.easyjobs.api.repository.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;

@Transactional
@Service
public class CompanyService {

    private CompanyRepository companyRepository;
    private FirebaseApp firebaseApp;

    @Autowired
    public CompanyService(CompanyRepository companyRepository,
                           FirebaseApp firebaseApp){
        this.companyRepository= companyRepository;
        this.firebaseApp = firebaseApp;
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
        }catch(Exception e){
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity getCompanyMe(String email) {
        try {
            return new Response<>(companyRepository.findOneByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getCompanyProfile(String companyId) {
        return new Response<>(companyRepository.findOneByIdAndIsDeleted(Integer.parseInt(companyId), false), HttpStatus.OK);
    }

    public ResponseEntity updateCompany(CompanyUpdateRequest companyUpdateRequest, String email) {
        try {
            Company dbCompany = companyRepository.findOneByEmail(email);

            if(companyUpdateRequest.getDescription() != null){
                dbCompany.setDescription(companyUpdateRequest.getDescription());
            }
            if(companyUpdateRequest.getFoundedDate() != null){
                dbCompany.setFoundedDate(companyUpdateRequest.getFoundedDate());
            }
            if(companyUpdateRequest.getName() != null){
                dbCompany.setName(companyUpdateRequest.getName());
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

}
