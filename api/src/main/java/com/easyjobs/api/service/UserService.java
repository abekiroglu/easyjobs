package com.easyjobs.api.service;

import com.easyjobs.api.dto.request.ChangePasswordRequest;
import com.easyjobs.api.dto.request.UserSignupRequest;
import com.easyjobs.api.dto.request.UserUpdateRequest;
import com.easyjobs.api.dto.response.ErrorResponse;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.dto.response.SimpleUser;
import com.easyjobs.api.dto.response.exception.ResourceNotFoundException;
import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.easyjobs.api.integration.sendgrid.SendGridUtil;
import com.easyjobs.api.model.Profession;
import com.easyjobs.api.model.User;
import com.easyjobs.api.repository.ProfessionRepository;
import com.easyjobs.api.repository.UserRepository;
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
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Transactional
@Service
public class UserService {
    private ProfessionRepository professionRepository;
    private UserRepository userRepository;
    private FirebaseApp firebaseApp;

    @Autowired
    public UserService(ProfessionRepository professionRepository,
                           UserRepository userRepository,
                           FirebaseApp firebaseApp){
        this.professionRepository= professionRepository;
        this.userRepository= userRepository;
        this.firebaseApp = firebaseApp;
    }

    public Response signup(UserSignupRequest userSignupRequest) {
        try {
            //Create a request for Firebase
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(userSignupRequest.getEmail())
                    .setEmailVerified(true)
                    .setPassword(userSignupRequest.getPassword())
                    .setDisplayName(String.format("%s %s", userSignupRequest.getName(), userSignupRequest.getSurname()))
                    .setDisabled(false);
            if(userSignupRequest.getPhoneNumber() != null && userSignupRequest.getPhoneNumber().length() == 13){
                request.setPhoneNumber(userSignupRequest.getPhoneNumber());
            }
            // Send request to Firebase
            UserRecord userRecord = FirebaseAuth.getInstance(firebaseApp).createUser(request);
            // Generate a verification link and send a verification email with SendGrid
            String verificationLink = FirebaseAuth.getInstance(firebaseApp).generateEmailVerificationLink(userRecord.getEmail());
            SendGridUtil.send(userRecord.getEmail(), "Activate your EasyJobs account", verificationLink);
            // Create user entity in DB
            User user = new User();
            user.setProfession(professionRepository.getOne( 1));
            user.setEmail(userSignupRequest.getEmail());
            user.setName(userSignupRequest.getName());
            user.setSurname(userSignupRequest.getSurname());
            user.setValidated(false);
            user.setLastActionTime(Instant.now().getEpochSecond());
            userRepository.save(user);

            return new Response<>(userRecord, HttpStatus.CREATED);
        }catch(Exception e){
            return new Response<>(e, HttpStatus.CONFLICT, e);
        }
    }

    public ResponseEntity getUser(String email) {
        try{
            return new Response<>(new SimpleUser(userRepository.findOneByEmailAndIsDeleted(email, false)), HttpStatus.OK);
        } catch (Exception e){
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getUserMe(String email) {
        try {
            return new Response<>(userRepository.findOneByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity updateUser(UserUpdateRequest user, String email) {
        try {
            User dbUser = userRepository.findOneByEmail(email);

            if(user.getProfession() != null){
                Profession profession = professionRepository.findOneById(user.getProfession());
                if(profession != null){
                    dbUser.setProfession(profession);
                }else{
                    throw new ResourceNotFoundException();
                }
            }
            if(user.getDeletedComments() != null && user.getDeletedComments().size() != 0){
                dbUser.getComments().removeAll(user.getNewComments());
            }
            if(user.getNewComments() != null && user.getNewComments().size() != 0){
                dbUser.getComments().addAll(user.getNewComments());
            }
            if(user.getDeletedExperiences() != null && user.getDeletedExperiences().size() != 0){
                dbUser.getExperiences().removeAll(user.getDeletedExperiences());
            }
            if(user.getNewExperiences() != null && user.getNewExperiences().size() != 0){
                dbUser.getExperiences().addAll(user.getNewExperiences());
            }
            if(user.getDeletedSkills() != null && user.getDeletedSkills().size() != 0){
                dbUser.getSkills().removeAll(user.getDeletedSkills());
            }
            if(user.getNewSkills() != null && user.getNewSkills().size() != 0){
                dbUser.getSkills().addAll(user.getNewSkills());
            }
            if(user.getBirthDate() != null){
                dbUser.setBirthDate(user.getBirthDate());
            }
            if(user.getName() != null){
                dbUser.setName(user.getName());
            }
            if(user.getSurname() != null) {
                dbUser.setSurname(user.getSurname());
            }
            return new Response<>(userRepository.save(dbUser), HttpStatus.OK);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity deleteUser(String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);

            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(token.getUid()).setDisabled(true);
            FirebaseAuth.getInstance(firebaseApp).updateUser(request);

            User user = userRepository.findOneByEmail(token.getEmail());
            user.setDeleted(true);
            return new Response<>(null, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new Response<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO Firebase doesn't set the password right, figure out why
    public ResponseEntity changePassword(ChangePasswordRequest newPassword, String auth) {
        try {
            FirebaseToken token = FirebaseUtil.decodeToken(auth);

            HttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC872wZNSFlc_iBSbZsHZ1OSOi2MG8Adn4");

            List<NameValuePair> params = new ArrayList<>(3);
            params.add(new BasicNameValuePair("idToken", auth));
            params.add(new BasicNameValuePair("password", newPassword.getNewPassword()));
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
                    return new Response<>(new ErrorResponse(code, message), HttpStatus.INTERNAL_SERVER_ERROR);
                }else{
                    return new Response<>(userRepository.findOneByEmail(token.getEmail()), HttpStatus.OK);
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

}
