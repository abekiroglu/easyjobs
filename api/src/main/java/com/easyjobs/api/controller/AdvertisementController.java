package com.easyjobs.api.controller;

import com.easyjobs.api.model.Advertisement;
import com.easyjobs.api.service.EasyJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/advertisements")
public class AdvertisementController {
    private EasyJobsService service;

    @Autowired
    public AdvertisementController(EasyJobsService service) {
        this.service = service;
    }

    @PostMapping("/")
    public ResponseEntity createAdvertisement(@RequestBody Advertisement advertisement, @RequestHeader String auth){
        return service.createAdvertisement(advertisement, auth);
    }

    @GetMapping("/{advertisementId}")
    public ResponseEntity getAdvertisement(@PathVariable String advertisementId, @RequestHeader String auth){
        return service.getAdvertisement(advertisementId, auth);
    }

    @PatchMapping("{advertisementId}")
    public ResponseEntity updateAdvertisement(@PathVariable String advertisementId, @RequestHeader String auth, @RequestBody Advertisement advertisement){
        return service.updateAdvertisement(advertisement, advertisementId, auth);
    }

    @DeleteMapping("{advertisementId}")
    public ResponseEntity deleteAdvertisement(@PathVariable String advertisementId, @RequestHeader String auth){
        return service.deleteAdvertisement(advertisementId, auth);
    }

    @GetMapping("/search")
    public ResponseEntity getAdvertisements(@RequestParam Integer id, @RequestParam Integer companyId, @RequestHeader String auth){
        return service.searchAdvertisements(id, companyId, auth);
    }

    @GetMapping("/{advertisementId}/details")
    public ResponseEntity getAdvertisementDetails(@PathVariable Integer advertisementId){
        return service.getAdvertisementDetails(advertisementId);
    }

    @GetMapping("/{advertisementId}/apply")
    public ResponseEntity applyForJob(@PathVariable String advertisementId, @RequestHeader String auth){
        return service.applyForJob(advertisementId);
    }

    @GetMapping("/{advertisementId}/hire")
    public ResponseEntity hireAUser(@PathVariable String advertisementId, @RequestHeader String auth){
        return service.hireAUser(advertisementId, auth);
    }

    @GetMapping("/{advertisementId}/recommended")
    public ResponseEntity getRecommendedUsers(@PathVariable String advertisementId, @RequestHeader String auth){
        return service.getRecommendedUsers(advertisementId, auth);
    }
}
