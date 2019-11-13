package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.UserSignupRequest;
import com.easyjobs.api.model.User;
import com.easyjobs.api.service.EasyJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity signup(@RequestBody UserSignupRequest userSignupRequest) {
        return service.signup(userSignupRequest);
    }
//    @PostMapping("/login")
//    public ResponseEntity login(@RequestBody LoginRequest loginRequest, @RequestHeader String uid){
//        return service.login(loginRequest);
//    }

    @PostMapping("/profile")
    public ResponseEntity createProfile(@RequestBody User userProfile) {
        return service.createUserProfile(userProfile);
    }
    @GetMapping("/{email}")
    public ResponseEntity getUser(@PathVariable String email){
        return service.getUser(email);
    }
    @GetMapping("/")
    public ResponseEntity getMe(@RequestHeader String auth){
        return service.getUserMe(auth);
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
