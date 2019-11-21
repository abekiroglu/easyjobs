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
        self.userSignUpRequest = UserSignUpRequest(password: "x", email: "x", phoneNumber: "x", name: "x", surname: "x")
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
    
    func getSkills(profession: SimpleProfession) -> [SimpleSkill]{
        var skills : [SimpleSkill] = []
        var skillGroups : [SimpleSkillGroup] = profession.skills
        for skillGroup in skillGroups{
            for skill in skillGroup.skills{
                skills.append(skill)
            }
        }
        return skills
    }
    
    func loadProfessionList(){
           let session = URLSession.shared
           var request = URLRequest(url: URL(string: "http://localhost:8080/v1/professions/")!)
          let currentUser = Auth.auth().currentUser
          currentUser?.getIDToken() { idToken, error in
            if let error = error {
              // Handle error
              return;
            }
            print("Here is the token: \(idToken)")
            request.httpMethod = "GET"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            let dataTask = session.dataTask(with: request) {(data, response, error) in
            print("HERE: \(String.init(data: data!, encoding: .utf8))")
            let decoder = JSONDecoder()
            self.professionList = try! decoder.decode([SimpleProfession].self, from: data!)
                      }
            dataTask.resume()
            // Send token to your backend via HTTPS
            // ...
          }
       }
}
