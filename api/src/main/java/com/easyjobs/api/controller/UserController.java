package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.ChangePasswordRequest;
import com.easyjobs.api.dto.request.LoginRequest;
import com.easyjobs.api.dto.request.SignupRequest;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.model.User;
import com.easyjobs.api.model.UserProfile;
import com.easyjobs.api.service.EasyJobsService;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import javafx.concurrent.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/users")
public class UserController {
    private EasyJobsService service;

    @Autowired
    public UserController(EasyJobsService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequest signupRequest) {
        return service.signup(signupRequest);
    }
//    @PostMapping("/login")
//    public ResponseEntity login(@RequestBody LoginRequest loginRequest, @RequestHeader String uid){
//        return service.login(loginRequest);
//    }

    @PostMapping("/profile")
    public ResponseEntity createProfile(@RequestBody UserProfile userProfile) {
        return service.createProfile(userProfile);
    }
    @GetMapping("/{userId}")
    public ResponseEntity getUser(@PathVariable Integer userId){
        return service.getUser(userId);
    }
    @PatchMapping("/")
    public ResponseEntity updateUser(@RequestBody User user){
        return service.updateUser(user);
    }
    @DeleteMapping("/")
    public ResponseEntity deleteUser(){
        return service.deleteUser();
    }
    @PatchMapping("/password")
    public ResponseEntity changePassword(@RequestBody ChangePasswordRequest changePasswordRequest){
        return service.changePassword(changePasswordRequest);
    }
    @PostMapping("/password")
    public ResponseEntity passwordReset(@RequestBody String userIdentifier){
        return service.passwordReset(userIdentifier);
    }
}
