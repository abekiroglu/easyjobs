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

struct Advertisement: Codable{
    var id: Int
    var publishDate: String
    var validUntil: String
    var description: String
    var requirements: [Assessment]
    var comments: [Comment]
    var profession: Profession?
    var company: Company
}

struct Assessment: Codable{
    var id: Int
    var weight: Double
    var skill: Skill
}

struct Comment: Codable{
    var commentedAt: Date
    var content: String
    var rating: Double
}

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
    
    init(){
        email = ""
        isValidated = true
        applications = []
        comments = []
        advertisements = []
        lastActionTime = 0
        foundedDate = Date()
        name = ""
        description = ""
        picture = ""
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
    var id: Int
    var postDate: String
    var resolved: Bool
    var issuedBy: String
    var advertisementId: Int
}

struct Profession: Codable{
    var id: Int
    var title: String
    var description: String
    var skillGroups: [SkillGroup]
    var advertisements: [Advertisement]?
    
    init(title: String){
        id = 0
        self.title = title
        description = title
        skillGroups  = []
        advertisements = []
    }
}

struct Skill: Codable{
    var id: Int
    var description: String
    
    init(description: String){
        id = 0
        self.description = description
    }
}

struct SkillGroup: Codable{
    var id: Int
    var description: String
    var skills: [Skill]
    
    init(description: String){
        id = 0
        self.description = description
        skills = []
    }
    
}

struct User: Codable{
    var id: Int
    var email: String
    var validated: Bool
    var comments: [Comment]
    var applications: [JobApplication]
    var lastActionTime: Int?
    var birthDate: Date?
    var name: String
    var surname: String
    var profession: Profession
    var skills: [Skill]
    var experiences: [Experience]
    var picture: String?
    
    init(){
        id = 0
        email = ""
        validated = false
        comments = []
        applications = []
        lastActionTime = 0
        birthDate = Date()
        name = ""
        surname = ""
        profession = Profession(title: "Please choose a profession")
        skills = []
        experiences = []
        picture = ""
    }
    
}
