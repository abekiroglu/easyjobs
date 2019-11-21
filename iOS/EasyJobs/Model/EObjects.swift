//
//  EObjects.swift
//  EasyJobs
//
//  Created by Diablito on 22.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation

struct LoadedUser: Codable{
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
    
struct BigLoadedUser: Codable{
        var id: Int
        var email: String
        var comments: [Comment]
        var applications: [JobApplication]
        var name: String
        var surname: String
        var profession: Profession
        var advertisements: [Advertisement]
        var skills : [Skill]
        var experiences: [Experience]
        var validated: Bool
    init(){
        id = 0
        email = ""
        comments = []
        applications = []
        name = ""
        surname = ""
        profession = Profession(title: "")
        advertisements = []
        skills = []
        experiences = []
        validated = false
    }
}

