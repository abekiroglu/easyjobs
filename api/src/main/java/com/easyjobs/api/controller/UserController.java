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
    @GetMapping("/{userName}")
    public ResponseEntity getUser(@PathVariable String userName){
        return service.getUser(userName);
    }
    @GetMapping("/")
    public ResponseEntity getMe(@RequestHeader String auth){
        return service.getMe(auth);
    }
    @PatchMapping("/")
    public ResponseEntity updateUser(@RequestBody User user, @RequestHeader String auth){
        return service.updateUser(user, auth);
    }
    @DeleteMapping("/")
    public ResponseEntity deleteUser(@RequestHeader String auth){
        return service.deleteUser(auth);
    }
    @PatchMapping("/password")
    public ResponseEntity changePassword(@RequestBody String newPassword, @RequestHeader String auth){
        return service.changePassword(newPassword, auth);
    }
    @PostMapping("/password")
    public ResponseEntity passwordReset(@RequestBody String userIdentifier){
        return service.passwordReset(userIdentifier);
    }
}
