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
    var loadedUser: LoadedUser
    var profession = Profession(title: "")
    var userUpdateRequest: UserUpdateRequest
    var bigLoadedUser: BigLoadedUser
    var user: User
    

    
    init(){
        self.userSignUpRequest = UserSignUpRequest(password: "x", email: "x", username: "x", name: "x", surname: "x")
        self.simpleProfession = SimpleProfession(title: "Software Developer")
        self.professionList = []
        /*user = User(email: "", isValidated: false, comments: [], applications: [], lastActionTime: 0, birthDate: Date(), name: "", surname:"", profession: profession, skills: [], experiences: [], picture: "")*/
        loadedUser = LoadedUser()
        userUpdateRequest = UserUpdateRequest()
        bigLoadedUser = BigLoadedUser()
        self.user = User(email: "", isValidated: false, comments: [], applications: [], lastActionTime: 0, birthDate: Date(), name: "", surname: "", profession: Profession(title: ""), skills: [], experiences: [], picture: "")
    }
    
    func signUp(password: String, email: String, username: String, name: String, surname: String){
        self.userSignUpRequest = UserSignUpRequest(password: password, email: email, username: username, name: name, surname: surname)
        let session = URLSession.shared
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/signup")!)
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
    
    func loadUser(){
        let session = URLSession.shared
            var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/")!)
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
                print(data!.count)
                if data!.count > 500 {
                    //self.user = try! decoder.decode(User.self, from: data!)
                } else {
             self.loadedUser = try! decoder.decode(LoadedUser.self, from: data!)
                }
                       }
             dataTask.resume()
             // Send token to your backend via HTTPS
             // ...
           }
        }
    
    
    func updateProfile(name: String, surname: String, profession: Int){
        
        userUpdateRequest = UserUpdateRequest(birthDate: Date(), name: name, surname: surname, profession: profession, newExperiences: [], deletedExperiences: [], newSkills: [], deletedSkills: [])
        let session = URLSession.shared
        
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/")!)
        request.httpMethod = "PATCH"
               
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            print(self.userUpdateRequest)
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            guard let uploadData = try? JSONEncoder().encode(self.userUpdateRequest) else{
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
