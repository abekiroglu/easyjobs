//
//  Objects.swift
//  EasyJobs
//
//  Created by Diablito on 10.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation
import Firebase
import FirebaseAuth


//struct User{
  //  var username:String
    //var email:String
    //var profile:Userprofile
    //var isValidated:Bool
//}

struct UserSignUpRequest: Codable{
    var password: String
    var email: String
    var phoneNumber: String
    var name: String
    var surname: String
    
    init(password: String, email: String, phoneNumber: String, name: String, surname: String){
        self.password = password
        self.email = email
        self.phoneNumber = phoneNumber
        self.name = name
        self.surname = surname
    }
}

struct Company: Codable{
    var email: String
    var isValidated: Bool
    var applications: [JobApplication]
    var comments: [Comment]
    var advertisements: [Advertisement]
    var isDeleted: Bool
    var foundedDate: Date
    var name: String
    var description: String
}

struct Advertisement: Codable{
    var publishDate: Date
    var validUntil: Date
    var description: String
    var requirements: [Assessment]
    var comments: [Comment]
    var profession: Profession
}

struct Assessment: Codable{
    var weight: Double
    var advertisement: Advertisement
    var skills: Skill
    var isDeleted: Bool
}

struct Comment: Codable{
    var commentedAt: Date
    var content: String
    var rating: Double
    var user: User
    var company: Company
    var advertisement: Advertisement
    var isDeleted: Bool
}

struct SimpleProfession: Codable{
    var title: String
    var description: String
    var skills: [SimpleSkill]
    
    init(title: String){
           self.title = title
           description = title
           let skill1 = SimpleSkill(description: "Java")
           let skill2 = SimpleSkill(description: "C#")
           let skill3 = SimpleSkill(description: "Javascript")
           skills = []
           skills.append(skill1)
           skills.append(skill2)
           skills.append(skill3)
       }
}

struct SimpleSkill: Codable{
    var description: String
    
    init(description: String){
        self.description = description
    }
}

struct Profession: Codable{
    var title: String
    var description: String
    var skills: [Skill]
    var advertisements: [Advertisement]
    var isDeleted: Bool
    
    init(title: String){
        self.title = title
        description = title
        let skill1 = Skill(description: "Java")
        let skill2 = Skill(description: "C#")
        let skill3 = Skill(description: "Javascript")
        skills = []
        skills.append(skill1)
        skills.append(skill2)
        skills.append(skill3)
        advertisements = []
        isDeleted = false
    }
}

struct Skill: Codable{
    var description: String
    var users: [User]
    var professions: [Profession]
    var isDeleted: Bool
    init(description: String){
        self.description = description
        users = []
        professions = []
        isDeleted = false
    }
}
struct Experience: Codable{
    var startDate: Date
    var endDate: Date
    var company: Company
    var profession: Profession
    var user: User
    var isDeleted: Bool
}
struct JobApplication: Codable{
    var postDate: Date
    var isResolved: Bool
    var applicant: User
    var appliedTo: Company
    var isDeleted: Bool
}
struct User: Codable{
    var email: String
    var isValidated: Bool
    var comments: [Comment]
    var applications: [JobApplication]
    var isDeleted: Bool
    var birthDate: Date
    var name: String
    var surname: String
    var profession: Profession
    var skills: [Skill]
    var experiences: [Experience]
    
    
    
    
    init(email: String, isValidated: Bool, comments: [Comment], applications: [JobApplication], isDeleted: Bool, birthDate: Date, name: String, surname: String, profession: Profession, skills: [Skill], experiences: [Experience]){
        self.email = email
        self.isValidated = isValidated
        self.comments = comments
        self.applications = applications
        self.isDeleted = isDeleted
        self.birthDate = birthDate
        self.name = name
        self.surname = surname
        self.profession = profession
        self.skills = skills
        self.experiences = experiences
    }
    
    
    
}
