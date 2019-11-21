package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.CompanySignupRequest;
import com.easyjobs.api.dto.request.CompanyUpdateRequest;
import com.easyjobs.api.dto.response.Response;
import com.easyjobs.api.integration.aws.AwsService;
import com.easyjobs.api.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/companies")
public class CompanyController {
    private CompanyService service;
    private AwsService awsService;

    @Autowired
    public CompanyController(CompanyService service, AwsService awsService) {
        this.service = service;
        this.awsService = awsService;
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

    @PostMapping("/upload")
    public Response uploadImage(@RequestParam("file") MultipartFile file, Authentication authentication){
        return service.updateImageUrl(awsService.uploadImage(file), authentication.getName());
    }

    @GetMapping("/hire")
    public ResponseEntity hireAUser(@RequestParam Integer advertisementId, @RequestParam Integer userId, Authentication authentication){
        return service.hireAUser(advertisementId, userId, authentication);
    }
}
