package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.ChangePasswordRequest;
import com.easyjobs.api.dto.request.UserSignupRequest;
import com.easyjobs.api.dto.request.UserUpdateRequest;
import com.easyjobs.api.model.User;
import com.easyjobs.api.security.EasyJobsUser;
import com.easyjobs.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/users")
public class UserController {
    private UserService service;

    @Autowired
    public UserController(UserService service) {
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

    @GetMapping("/{email}")
    public ResponseEntity getUser(@PathVariable String email){
        return service.getUser(email);
    }
    @GetMapping("/")
    public ResponseEntity getMe(Authentication authentication){
        return service.getUserMe(authentication.getName());
    }
    @PatchMapping("/")
    public ResponseEntity updateUser(@RequestBody UserUpdateRequest user, Authentication authentication){
        return service.updateUser(user, authentication.getName());
    }
    @DeleteMapping("/")
    public ResponseEntity deleteUser(@RequestHeader String auth){
        return service.deleteUser(auth);
    }
    @PatchMapping("/password")
    public ResponseEntity changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, @RequestHeader String auth){
        return service.changePassword(changePasswordRequest, auth);
    }
    @PostMapping("/password")
    public ResponseEntity passwordReset(@RequestBody String userIdentifier){
        return service.passwordReset(userIdentifier);
    }
}
