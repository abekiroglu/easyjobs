package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.SignupRequest;
import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.User;
import com.easyjobs.api.model.UserProfile;
import com.easyjobs.api.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
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
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


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
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity createProfile(UserProfile userProfile) {
        return new Response<>(userProfileRepository.save(userProfile), HttpStatus.CREATED);
    }

    public ResponseEntity getUser(String userName) {
        return new Response<>(userRepository.findOneByUsername(userName), HttpStatus.OK);
    }

    public ResponseEntity getMe(String auth) {
        try {
            return new Response<>(userRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateUser(User user, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);
            //TODO Field checks, picture update
            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid())
                    .setEmail(user.getEmail())
                    .setDisplayName(String.format("%s %s", user.getProfile().getName(), user.getProfile().getSurname()));
            UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
            User dbUser = userRepository.findOneByEmail(token.getEmail());
            return new Response<>(userRepository.save(user), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteUser(String auth) {
        try {
            User user = userRepository.findOneByEmail(FirebaseUtil.decodeToken(auth).getEmail());
            user.setDeleted(true);
            return new Response<>(null, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity changePassword(String newPassword, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);

            HttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");

            List<NameValuePair> params = new ArrayList<>(3);
            params.add(new BasicNameValuePair("idToken", auth));
            params.add(new BasicNameValuePair("password", newPassword));
            params.add(new BasicNameValuePair("returnSecureToken", "true"));
            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

            HttpResponse response = httpclient.execute(httppost);
            HttpEntity entity = response.getEntity();

            if (entity != null) {
                InputStream inputstream = entity.getContent();
                ObjectMapper mapper = new ObjectMapper();
                Map jsonMap = mapper.readValue(inputstream, Map.class);
                if(jsonMap.containsKey("error")){
                    Map error = (Map) jsonMap.get("error");
                    String code = (String) error.get("code");
                    String message = (String) error.get("message");
                    new Response<>(new ErrorResponse(code, message), HttpStatus.INTERNAL_SERVER_ERROR);
                }else{
                    new Response<>(userRepository.findOneByEmail(token.getEmail()), HttpStatus.OK);
                }
            }
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
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
