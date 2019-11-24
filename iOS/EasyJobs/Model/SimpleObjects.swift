//
//  SimpleObjects.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation

struct SimpleAdvertisement: Codable{
    var id : Int
    var publishDate: Date
    var validUntil: Date
    var description: String
    var company: Company
    var matchRate: Double
}
struct SimpleCompany: Codable{
    var id: Int
    var email: String
    var foundedDate: Date
    var name: String
    var description: String
    var picture: String
}

struct SimpleProfession: Codable{
    var id: Int
    var title: String
    var description: String
    var skills: [SkillGroup]
    
    init(title: String){
        self.title = title
        description = title
        skills = []
        id = 0
       }
}

struct SimpleUser: Codable{
    var id: Int
    var email: String
    var birthDate: Date
    var name: String
    var surname: String
    var profession: Profession
    var skills: [Skill]
    var experiences: [Experience]
    var picture: String
    init(){
        id = 0
        email = ""
        birthDate = Date()
        name = ""
        surname = ""
        profession = Profession(title: "")
        skills = []
        experiences = []
        picture = ""
    }
}

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
    var birthDate: Date?
    var name: String
    var surname: String
    var profession: Int
    var newExperiences: [ExperienceWrapper]
    var deletedExperiences: [ExperienceWrapper]
    var newSkills: [Skill]
    var deletedSkills: [Skill]
    init(birthDate: Date?, name: String, surname: String, profession: Int, newExperiences: [ExperienceWrapper], deletedExperiences: [ExperienceWrapper], newSkills: [Skill], deletedSkills: [Skill]){
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
        birthDate = Date()
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



