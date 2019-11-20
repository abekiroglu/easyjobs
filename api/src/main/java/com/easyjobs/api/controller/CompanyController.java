package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.dto.request.CompanyUpdateRequest;
import com.easyjobs.api.service.CompanyService;
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
    private CompanyService service;

    @Autowired
    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public ResponseEntity registerCompany(@RequestBody CompanySignupRequest request){
        return service.registerCompany(request);
    }

    @GetMapping("/")
    public ResponseEntity getCompanyMe(Authentication authentication){
        return service.getCompanyMe(authentication.getName());
    }

    @GetMapping("/{companyId}")
    public ResponseEntity getCompanyProfile(@PathVariable String companyId){
        return service.getCompanyProfile(companyId);
    }

    @PatchMapping("/{companyId}")
    public ResponseEntity updateCompany(@RequestBody CompanyUpdateRequest company, Authentication authentication, @PathVariable String companyId){
        return service.updateCompany(company, authentication, companyId);
    }

    @DeleteMapping("/")
    public ResponseEntity deleteCompany(@RequestHeader String auth){
        return service.deleteCompany(auth);
    }
}
