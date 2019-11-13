package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.model.Company;
import com.easyjobs.api.service.EasyJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/companies")
public class CompanyController {
    private EasyJobsService service;

    @Autowired
    public CompanyController(EasyJobsService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody CompanySignupRequest request){
        return service.registerCompany(request);
    }

    @PostMapping("/profile")
    public ResponseEntity createCompanyProfile(@RequestBody Company companyProfile){
        return service.createCompanyProfile(companyProfile);
    }

    @GetMapping("/")
    public ResponseEntity getCompanyMe(Authentication authentication){
        return service.getCompanyMe(authentication.getName());
    }

    @GetMapping("/{companyId}")
    public ResponseEntity getCompanyProfile(@PathVariable String companyId){
        return service.getCompanyProfile(companyId);
    }

    @PatchMapping("/profile")
    public ResponseEntity updateCompany(@RequestHeader String auth, @RequestBody Company company){
        return service.updateCompany(company, auth);
    }

    @DeleteMapping("/")
    public ResponseEntity deleteCompany(Authentication authentication){
        return service.deleteCompany(authentication.getName());
    }
}
