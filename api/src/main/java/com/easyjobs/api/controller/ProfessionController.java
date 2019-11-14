package com.easyjobs.api.controller;

import com.easyjobs.api.service.EasyJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/v1/professions")
public class ProfessionController {
    private EasyJobsService service;

    @Autowired
    public ProfessionController(EasyJobsService service) {
        this.service = service;
    }

    @GetMapping("/")
    public ResponseEntity getProfessions(){
        return service.getProfessions();
    }
}
