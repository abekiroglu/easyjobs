//
//  SimpleObjects.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation

struct UserSignUpRequest: Codable{
    var username: String
    var password: String
    var email: String
    var name: String
    var surname: String
    
    init(password: String, email: String, username: String, name: String, surname: String){
        self.password = password
        self.email = email
        self.username = username
        self.name = name
        self.surname = surname
    }
}

struct UserUpdateRequest: Codable{
    var birthDate: String?
    var name: String
    var surname: String
    var profession: Int
    var newExperiences: [ExperienceWrapper]
    var deletedExperiences: [ExperienceWrapper]
    var newSkills: [Skill]
    var deletedSkills: [Skill]
    init(birthDate: String?, name: String, surname: String, profession: Int, newExperiences: [ExperienceWrapper], deletedExperiences: [ExperienceWrapper], newSkills: [Skill], deletedSkills: [Skill]){
        self.birthDate = birthDate
        self.name = name
        self.surname = surname
        self.profession = profession
        self.newExperiences = newExperiences
        self.deletedExperiences = deletedExperiences
        self.newSkills = newSkills
        self.deletedSkills = deletedSkills
    }
    init(){
        birthDate = ""
        name = ""
        surname = ""
        profession = 1
        newExperiences = []
        deletedExperiences = []
        newSkills = []
        deletedSkills = []
    }
}

struct ExperienceWrapper: Codable{
    var id: Int
    var startDate: Date
    var endDate: Date
    var companyId: Int
    var professionId: Int
}













