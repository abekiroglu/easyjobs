package com.easyjobs.api.controller;

import com.easyjobs.api.dto.request.AdvertisementCreateRequest;
import com.easyjobs.api.dto.request.AdvertisementUpdateRequest;
import com.easyjobs.api.model.Advertisement;
import com.easyjobs.api.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/advertisements")
public class AdvertisementController {
    private AdvertisementService service;

    @Autowired
    public AdvertisementController(AdvertisementService service) {
        this.service = service;
    }

    @PostMapping("/")
    public ResponseEntity createAdvertisement(@RequestBody AdvertisementCreateRequest request, Authentication authentication){
        return service.createAdvertisement(request, authentication.getName());
    }

    @GetMapping("/{advertisementId}")
    public ResponseEntity getAdvertisement(@PathVariable String advertisementId, Authentication authentication){
        return service.getAdvertisement(advertisementId, authentication.getName());
    }

    @PatchMapping("/{advertisementId}")
    public ResponseEntity updateAdvertisement(@PathVariable String advertisementId, Authentication authentication, @RequestBody AdvertisementUpdateRequest request){
        return service.updateAdvertisement(request, advertisementId, authentication);
    }

    @DeleteMapping("/{advertisementId}")
    public ResponseEntity deleteAdvertisement(@PathVariable String advertisementId, Authentication authentication){
        return service.deleteAdvertisement(advertisementId, authentication.getName());
    }

    @GetMapping("/search")
    public ResponseEntity getAdvertisements(@RequestParam Integer id, @RequestParam Integer companyId, Authentication authentication){
        return service.searchAdvertisements(id, companyId, authentication);
    }

    @GetMapping("/{advertisementId}/details")
    public ResponseEntity getAdvertisementDetails(@PathVariable Integer advertisementId){
        return service.getAdvertisementDetails(advertisementId);
    }

    @GetMapping("/{advertisementId}/apply")
    public ResponseEntity applyForJob(@PathVariable String advertisementId, Authentication authentication){
        return service.applyForJob(advertisementId, authentication);
    }

    @GetMapping("/{advertisementId}/recommended")
    public ResponseEntity getRecommendedUsers(@PathVariable String advertisementId, Authentication authentication){
        return service.getRecommendedUsers(advertisementId, authentication);
    }
}
