//
//  User.swift
//  EasyJobs
//
//  Created by Diablito on 14.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation
import FirebaseAuth
import Firebase

protocol ProfessionDataSourceDelegate{
}

class ProfessionDataSource{
    
    var userSignUpRequest: UserSignUpRequest
    //var profession: Profession
    var simpleProfession: SimpleProfession
    var professionList: [SimpleProfession]
    var delegate: ProfessionDataSourceDelegate?
    

    
    init(){
        self.userSignUpRequest = UserSignUpRequest(password: "x", email: "x", username: "x", name: "x", surname: "x")
        self.simpleProfession = SimpleProfession(title: "Software Developer")
        self.professionList = []
    }
    
    
    func getMatchingProfession(title: String, professionList: [SimpleProfession]) -> SimpleProfession{
        var selectedProfession = SimpleProfession(title: "xxx")
        
        for profession in professionList{
            if title == profession.title{
                selectedProfession = profession
            }
        }
        return selectedProfession
    }
    
    func getSkills(profession: SimpleProfession) -> [Skill]{
        var skills : [Skill] = []
        let skillGroups : [SkillGroup] = profession.skills
        for skillGroup in skillGroups{
            for skill in skillGroup.skills{
                skills.append(skill)
            }
        }
        return skills
    }
    
    func getNewSkills(oldSkills: [Skill], selectedSkills: [Skill]) -> [Skill]{
        var newSkills: [Skill] = []
        if selectedSkills.isEmpty{}
        else{
            //print("Getting New Skills")
            var addElement: Bool
            for i in 0...selectedSkills.count-1{
                addElement =  true
                for j in 0...oldSkills.count-1{
                    if selectedSkills[i].description == oldSkills[j].description{
                        addElement = false
                        //print("SelectedSkill: \(selectedSkills[i].description) is not new")
                    }
                }
                //print("Skill: \(selectedSkills[i].description), addElement: \(addElement)")
                if addElement {
                    newSkills.append(selectedSkills[i])
                    //print("New Skill: \(selectedSkills[i])")
                }
                
            }
        }
        return newSkills
    }
    
    func getDeletedSkills(oldSkills: [Skill], selectedSkills: [Skill]) -> [Skill]{
        //print("Inside get deleted skills")
        var deletedSkills: [Skill] = []
        if selectedSkills.count < 1{
            deletedSkills = oldSkills
        }else{
            
            for i in 0...oldSkills.count-1{
                var addElement: Bool = true
                for j in 0...selectedSkills.count-1{
                    if selectedSkills[j].description == oldSkills[i].description{
                        addElement = false
                    }
                }
                if addElement {deletedSkills.append(oldSkills[i])}
            }
        }
        return deletedSkills
    }

    
    func loadProfessionList(){
           let session = URLSession.shared
           var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/professions/")!)
          let currentUser = Auth.auth().currentUser
          currentUser?.getIDToken() { idToken, error in
            if let error = error {
              // Handle error
              return;
            }
            //print("Here is the token: \(idToken)")
            request.httpMethod = "GET"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            let dataTask = session.dataTask(with: request) {(data, response, error) in
            //print("HERE: \(String.init(data: data!, encoding: .utf8))")
            let decoder = JSONDecoder()
            self.professionList = try! decoder.decode([SimpleProfession].self, from: data!)
                      }
            dataTask.resume()
            // Send token to your backend via HTTPS
            // ...
          }
       }
}
