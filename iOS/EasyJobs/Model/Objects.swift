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

struct Company: Codable{
    var email: String
    var isValidated: Bool
    var applications: [JobApplication]
    var comments: [Comment]
    var advertisements: [Advertisement]
    var lastActionTime: Int
    var foundedDate: Date
    var name: String
    var description: String
    var picture: String
    
    init(name: String){
        email = ""
        isValidated = true
        applications = []
        comments = []
        advertisements = []
        lastActionTime = 0
        foundedDate = Date()
        self.name = name
        description = ""
        picture = ""
    }
}

struct Advertisement: Codable{
    var id: Int
    var publishDate: Date
    var validUntil: Date
    var description: String
    var requirements: [Assessment]
    var comments: [Comment]
    //var profession: Profession
   // var company: Company
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
struct SkillGroup: Codable{
    var description: String
    var skills: [Skill]
    
    init(description: String){
        self.description = description
        skills = []
    }
    
}



struct Skill: Codable{
    var description: String
    
    init(description: String){
        self.description = description
    }
}

struct Profession: Codable{
    var id: Int
    var title: String
    var description: String
    var skillGroups: [SkillGroup]
    var advertisements: [Advertisement]
    
    init(title: String){
        id = 0
        self.title = title
        description = title
        let skill1 = Skill(description: "Java")
        let skill2 = Skill(description: "C#")
        let skill3 = Skill(description: "Javascript")
        skillGroups  = []
        advertisements = []
    }
}

struct Experience: Codable{
    var startDate: Date
    var endDate: Date
    var company: Company
    var profession: Profession
    var user: User
}

struct JobApplication: Codable{
    var postDate: Date
    var isResolved: Bool
    var applicant: User
    var appliedTo: Company
    var issuedBy: String
}

struct User: Codable{
    var email: String
    var isValidated: Bool
    var comments: [Comment]
    var applications: [JobApplication]
    var lastActionTime: Int
    var birthDate: Date
    var name: String
    var surname: String
    var profession: Profession
    var skills: [Skill]
    var experiences: [Experience]
    var picture: String
    
    init(email: String, isValidated: Bool, comments: [Comment], applications: [JobApplication], lastActionTime: Int, birthDate: Date, name: String, surname: String, profession: Profession, skills: [Skill], experiences: [Experience], picture: String){
        self.email = email
        self.isValidated = isValidated
        self.comments = comments
        self.applications = applications
        self.lastActionTime = lastActionTime
        self.birthDate = birthDate
        self.name = name
        self.surname = surname
        self.profession = profession
        self.skills = skills
        self.experiences = experiences
        self.picture = picture
    }
    
    
    
}
