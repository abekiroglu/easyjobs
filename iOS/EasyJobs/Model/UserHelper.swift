//
//  UserHelper.swift
//  EasyJobs
//
//  Created by Diablito on 18.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation
import FirebaseAuth
import Firebase

protocol UserHelperDelegate{
    func goToMenu()
    func showSignUpError(error: String)
}

class UserHelper{
    
    var userSignUpRequest: UserSignUpRequest
    //var profession: Profession
    let professionDataSource = ProfessionDataSource()
    var simpleProfession: SimpleProfession
    var professionList: [SimpleProfession]
    var delegate: UserHelperDelegate?
    

    
    init(){
        self.userSignUpRequest = UserSignUpRequest(password: "x", email: "x", phoneNumber: "x", name: "x", surname: "x")
        self.simpleProfession = SimpleProfession(title: "Software Developer")
        self.professionList = []
    }
    
    func signUp(password: String, email: String, phoneNumber: String, name: String, surname: String){
        self.userSignUpRequest = UserSignUpRequest(password: password, email: email, phoneNumber: phoneNumber, name: name, surname: surname)
        let session = URLSession.shared
        var request = URLRequest(url: URL(string: "http://localhost:8080/v1/users/signup")!)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        guard let uploadData = try? JSONEncoder().encode(userSignUpRequest) else{
            return
        }
        let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
            if error == nil{
                self.delegate?.goToMenu()
                self.delegate?.showSignUpError(error: "User signed up")
                print("signUpDone")
            } else{
                print(error)
                self.delegate?.showSignUpError(error:"Couldn`t sign user up")
                print("Couldn`t sign user up")
            }
        }
        uploadTask.resume()
    }
    
    func createProfile(email: String, birthDate:Date, name: String, surname: String, profession: Profession, skills: [Skill], experiences: [Experience] ){
        
        let user = User(email: email, isValidated: true, comments: [], applications: [], isDeleted: false, birthDate: birthDate, name: name, surname: surname, profession: profession , skills: skills, experiences: [])
        let session = URLSession.shared
        
        var request = URLRequest(url: URL(string: "http://localhost:8080/v1/users/profile")!)
        request.httpMethod = "POST"
               
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            guard let uploadData = try? JSONEncoder().encode(user) else{
                return
            }
            let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
                if error == nil{
                    print("Profile created")
                } else{
                    print(error)
                }
            }
            uploadTask.resume()
          // Send token to your backend via HTTPS
          // ...
        }
    }
    
    func updateProfile(email: String, birthDate:Date, name: String, surname: String, profession: Profession, skills: [Skill], experiences: [Experience] ){
        
        let user = User(email: email, isValidated: true, comments: [], applications: [], isDeleted: false, birthDate: birthDate, name: name, surname: surname, profession: profession , skills: skills, experiences: [])
        let session = URLSession.shared
        
        var request = URLRequest(url: URL(string: "http://localhost:8080/v1/users/")!)
        request.httpMethod = "PATCH"
               
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            guard let uploadData = try? JSONEncoder().encode(user) else{
                return
            }
            let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
                if error == nil{
                    print("Profile created")
                } else{
                    print(error)
                }
            }
            uploadTask.resume()
          // Send token to your backend via HTTPS
          // ...
        }
    }
}
