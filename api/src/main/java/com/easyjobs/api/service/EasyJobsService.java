package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.ChangePasswordRequest;
import com.easyjobs.api.dto.request.LoginRequest;
import com.easyjobs.api.dto.request.SignupRequest;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.User;
import com.easyjobs.api.model.UserProfile;
import com.easyjobs.api.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.Http;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Transactional
@Service
public class EasyJobsService {
    private AdvertisementRepository advertisementRepository;
    private AssessmentRepository assessmentRepository;
    private CommentRepository commentRepository;
    private CompanyRepository companyRepository;
    private CompanyProfileRepository companyProfileRepository;
    private ExperienceRepository experienceRepository;
    private JobApplicationRepository jobApplicationRepository;
    private ProfessionRepository professionRepository;
    private SkillRepository skillRepository;
    private UserProfileRepository userProfileRepository;
    private UserRepository userRepository;
    private FirebaseApp firebaseApp;

    @Autowired
    public EasyJobsService(AdvertisementRepository advertisementRepository,
                           AssessmentRepository assessmentRepository,
                           CommentRepository commentRepository,
                           CompanyRepository companyRepository,
                           CompanyProfileRepository companyProfileRepository,
                           ExperienceRepository experienceRepository,
                           JobApplicationRepository jobApplicationRepository,
                           ProfessionRepository professionRepository,
                           SkillRepository skillRepository,
                           UserProfileRepository userProfileRepository,
                           UserRepository userRepository,
                           FirebaseApp firebaseApp){
        this.advertisementRepository = advertisementRepository;
        this.assessmentRepository= assessmentRepository;
        this.commentRepository= commentRepository;
        this.companyRepository= companyRepository;
        this.companyProfileRepository= companyProfileRepository;
        this.experienceRepository= experienceRepository;
        this.jobApplicationRepository= jobApplicationRepository;
        this.professionRepository= professionRepository;
        this.skillRepository= skillRepository;
        this.userProfileRepository= userProfileRepository;
        this.userRepository= userRepository;
        this.firebaseApp = firebaseApp;
    }

    public Response signup(SignupRequest signupRequest) {
        try {
            //Create a request for Firebase
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(signupRequest.getEmail())
                    .setEmailVerified(false)
                    .setPassword(signupRequest.getPassword())
                    .setPhoneNumber(signupRequest.getPhoneNumber())
                    .setDisplayName(String.format("%s %s", signupRequest.getName(), signupRequest.getSurname()))
                    .setDisabled(false);
            // Send request to Firebase
            UserRecord userRecord = FirebaseAuth.getInstance(firebaseApp).createUser(request);
            // Generate a verification link and send a verification email with SendGrid
            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(userRecord.getEmail());
            //TODO email structure instead of passing verification link
            SendGridUtil.send(userRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
            // Create user entity in DB
            User user = new User();
            UserProfile userProfile = new UserProfile();
            userProfile.setProfession(professionRepository.getOne( 1));
            user.setEmail(signupRequest.getEmail());
            user.setUsername(signupRequest.getUsername());
            user.setValidated(false);
            user.setProfile(userProfile);
            userRepository.save(user);

            return new Response<>(userRecord, HttpStatus.CREATED);
        }catch(Exception e){
            return new Response<>(e.getMessage(), HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity createProfile(UserProfile userProfile) {
        return new Response<>(userProfileRepository.save(userProfile), HttpStatus.CREATED);
    }

    public ResponseEntity getUser(Integer userId) {
        if(userId.equals(0)){
            //TODO return the authenticated users information
            return new Response<>("{TODO}", HttpStatus.OK);
        }else{
            return new Response<>(userRepository.getOne(userId), HttpStatus.OK);
        }
    }

    public ResponseEntity updateUser(User user) {
        //TODO check if the payload is forged (i.e. trying to update another user) with the authentication token
        return new Response<>(userRepository.save(user), HttpStatus.OK);
    }

    public ResponseEntity deleteUser() {
        //TODO check if the payload is forged (i.e. trying to delete another user) with the authentication token
        User user = userRepository.getOne(0);
        user.setDeleted(true);
        return new Response<>(userRepository.save(user), HttpStatus.NO_CONTENT);
    }

    public ResponseEntity changePassword(ChangePasswordRequest changePasswordRequest) {
        //TODO not decided on whose task this is (front-end vs back-end)
        return new Response<>("{TODO}", HttpStatus.OK);
    }

    public ResponseEntity passwordReset(String userIdentifier) {
        //TODO not decided on whose task this is (front-end vs back-end)
        return new Response<>("{TODO}", HttpStatus.OK);
    }

//    public Response verifyEmail(){
//        return null;
//    }

//    public Response login(LoginRequest loginRequest) {
//        try{
//        HttpClient httpclient = HttpClients.createDefault();
//        HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");
//
//        List<NameValuePair> params = new ArrayList<>(3);
//        params.add(new BasicNameValuePair("email", loginRequest.getEmail()));
//        params.add(new BasicNameValuePair("password", loginRequest.getPassword()));
//        params.add(new BasicNameValuePair("returnSecureToken", "true"));
//        httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
//
//        HttpResponse response = httpclient.execute(httppost);
//        HttpEntity entity = response.getEntity();
//
//        if (entity != null) {
//            try (InputStream instream = entity.getContent()) {
//                ObjectMapper mapper = new ObjectMapper();
//                Map<String, Object> jsonMap = mapper.readValue(instream, Map.class);
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }
//        }
//        } catch (UnsupportedEncodingException e1) {
//            e1.printStackTrace();
//        } catch (ClientProtocolException e1) {
//            e1.printStackTrace();
//        } catch (IOException e1) {
//            e1.printStackTrace();
//        }
//        return null;
//    }


}
