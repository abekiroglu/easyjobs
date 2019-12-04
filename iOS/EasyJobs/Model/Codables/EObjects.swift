//
//  EObjects.swift
//  EasyJobs
//
//  Created by Diablito on 22.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation

struct LoadedUser: Codable{
    //for loadUser() who havent created profile
    var id: Int
    var email: String
    var comments: [Comment]
    var applications: [JobApplication]
    var name: String
    var surname: String
    var profession: Profession
    
    init(){
        id = 0
        email = ""
        comments = []
        applications = []
        name = ""
        surname = ""
        profession = Profession(title: "")
    }
}

struct SimpleProfession: Codable{
    // For loadProfessionList()
    var id: Int
    var title: String
    var description: String
    var skills: [SkillGroup]
    
    init(title: String){
        id = 0
        self.title = title
        description = title
        skills = []
    }
}

struct LoadUserAdvertisement: Codable{
    //For loadUser()
    var id: Int
    var publishDate: String
    var validUntil: String
    var description: String
    var requirements: [Assessment]
    var comments: [Comment]
    
}

struct LoadUserProfession: Codable{
    var id: Int
    var title: String
    var description: String
    var skillGroups: [SkillGroup]
    var advertisements: [LoadUserAdvertisement]
    
    init(){
        id = 0
        title = ""
        description = ""
        skillGroups = []
        advertisements = []
    }
}

struct LoadUserUser: Codable{
    var id: Int
    var email: String
    var validated: Bool
    var comments: [Comment]
    var applications: [JobApplication]
    //var lastActionTime: Int?
    var birthDate: Date?
    var name: String
    var surname: String
    var profession: LoadUserProfession
    var skills: [Skill]
    var experiences: [Experience]
    var picture: String?
    
    init(){
        id = 0
        email = ""
        validated = false
        comments = []
        applications = []
        //lastActionTime = 0
        birthDate = Date()
        name = ""
        surname = ""
        profession = LoadUserProfession()
        skills = []
        experiences = []
        picture = ""
    }
    
}
    
    struct SimpleAdvertisement: Codable{
        // For AdvertisementDataSource.loadAdvertisementList()
        var id: Int
        var publishDate: String
        var validUntil: String
        var description: String
        var company: SimpleCompany
        var matchRate: Float
        init(){
            id = 0
            publishDate = "xxx"
            validUntil = "yyy"
            description = "Software Developer Advertisement"
            company = SimpleCompany()
            matchRate = 0.66
        }
        
    }
    
    struct SimpleCompany: Codable{
        // For AdvertisementDataSource.loadAdvertisementList()
        var id: Int
        var email: String
        var foundedDate: String
        var name: String
        var description: String
        var picture: String
        
        init(){
            id = 0
            email = "company@gmail.com"
            foundedDate = ""
            name = "Google"
            description = ""
            picture = ""
        }
    }


