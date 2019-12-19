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
import Alamofire
import SwiftyJSON

protocol UserHelperDelegate{
    func goToMenu()
    func showSignUpError(error: String)
    func showLoadingScreen()
    func closeLoadingScreen()
    func showProfileUpdatedLabel()
    func fillUI()
    func applicationAdIdsLoaded(advertisementIds: [Int], oldAdvertisementIds: [Int], offeredAdvertisementIds: [Int], oldOfferedAdvertisementIds: [Int])
    func applicationsToRemoveLoaded(advertisementIds: [Int])
    func applicationCanceled()
    func jobAccepted()
}

extension UserHelperDelegate{
    func goToMenu(){}
    func showSignUpError(error: String){}
    func showLoadingScreen(){}
    func closeLoadingScreen(){}
    func showProfileUpdatedLabel(){}
    func fillUI(){}
    func applicationAdIdsLoaded(advertisementIds: [Int], oldAdvertisementIds: [Int], offeredAdvertisementIds: [Int], oldOfferedAdvertisementIds: [Int]){}
    func applicationsToRemoveLoaded(advertisementIds: [Int]){}
    func applicationCanceled(){}
    func jobAccepted(){}

}

extension Data {
    
    mutating func append(_ string: String){
        if let data = string.data(using: .utf8){
            append(data)
        }
    }
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
    var bigLoadedUser: LoadUserUser
    var bigUser: Bool
    
    
    
    init(){
        self.userSignUpRequest = UserSignUpRequest(password: "x", email: "x", username: "x", name: "x", surname: "x")
        self.simpleProfession = SimpleProfession(title: "Software Developer")
        self.professionList = []
        /*user = User(email: "", isValidated: false, comments: [], applications: [], lastActionTime: 0, birthDate: Date(), name: "", surname:"", profession: profession, skills: [], experiences: [], picture: "")*/
        loadedUser = LoadedUser()
        userUpdateRequest = UserUpdateRequest()
        bigLoadedUser = LoadUserUser()
        bigUser = false
    }
    
    func signUp(password: String, email: String, username: String, name: String, surname: String){
        
        delegate?.showLoadingScreen()
        
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
                DispatchQueue.main.async {
                    self.delegate?.showSignUpError(error: "Sign Up Done!")
                }
                print("signUpDone")
            } else{
                print(error)
                DispatchQueue.main.async {
                    self.delegate?.showSignUpError(error:"Couldn`t sign user up")
                }
                
                print("Couldn`t sign user up")
            }
            DispatchQueue.main.async {
                self.delegate?.closeLoadingScreen()
            }
        }
        uploadTask.resume()
    }
    
    func cancelApplication(applicationId: Int){
            
            var userApplicationUpdateRequest = UserApplicationUpdateRequest(accepted: false)
            let session = URLSession.shared
            var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/applications/\(applicationId)")!)
            request.httpMethod = "PATCH"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            guard let uploadData = try? JSONEncoder().encode(userApplicationUpdateRequest) else{
                return
            }
            
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDToken(completion: { (idToken, error) in
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
                if error == nil{
        
                    print("Token received")
                    print(response)
                    DispatchQueue.main.async {
                        self.delegate?.applicationCanceled()
                    }
                    print("Application canceled")
                } else{
                    print(error)
                    print("Couldn`t cancel application")
                }
            }
            uploadTask.resume()
        })

        }
    
    func acceptApplication(applicationId: Int){
        var userApplicationUpdateRequest = UserApplicationUpdateRequest(accepted: true)
        let session = URLSession.shared
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/applications/\(applicationId)")!)
        print(request.url?.absoluteString)
        request.httpMethod = "PATCH"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        guard let uploadData = try? JSONEncoder().encode(userApplicationUpdateRequest) else{
            return
        }
        
    let currentUser = Auth.auth().currentUser
    currentUser?.getIDToken(completion: { (idToken, error) in
        request.addValue(idToken!, forHTTPHeaderField: "auth" )
        let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
            if error == nil{
    
                print("Token received")
                //print(response)
                DispatchQueue.main.async {
                    self.delegate?.jobAccepted()
                }
                print("Job taken!")
            } else{
                print(error)
                print("Couldn`t accept job")
            }
        }
        uploadTask.resume()
    })
        
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
            
            //print("User will load")
            let dataTask = session.dataTask(with: request) {(data, response, error) in
                print("HERE: \(String.init(data: data!, encoding: .utf8))")
                let decoder = JSONDecoder()
                //print("Loading User")
                //print(data!.count)
                if data!.count > 500 {
                    self.bigLoadedUser = try! decoder.decode(LoadUserUser.self, from: data!)
                    self.bigUser = true
                    if self.bigLoadedUser.applications.count>0{
                        print("There are applications")
                        var advertisementIds : [Int] = []
                        var oldAdvertisementIds: [Int] = []
                        var offeredAdvertisementIds: [Int] = []
                        var oldOfferedAdvertisementIds: [Int] = []
                        var applicationsToRemove: [Int] = []
                        for application in self.bigLoadedUser.applications{
                            applicationsToRemove.append(application.advertisementId)
                                if application.issuedBy == "User"{
                                    if application.resolved == false{
                                        advertisementIds.append(application.advertisementId)
                                        //print("\(application.advertisementId) added to advertisementIDs")
                                    }else{
                                        oldAdvertisementIds.append(application.advertisementId)
                                        //print("\(application.advertisementId) added to oldAdvertisementIDs")
                                    }
                                }else{
                                    if application.resolved ==  false{
                                        offeredAdvertisementIds.append(application.advertisementId)
                                    
                                        //print("\(application.advertisementId) added to offeredAdvertisementIDs")
                                    }else{
                                        oldOfferedAdvertisementIds.append(application.advertisementId)
                                        //print("\(application.advertisementId) added to oldOfferedAdvertisementIDs")
                                    }
                                }
                        }
                        print("Loading applications")
                        DispatchQueue.main.async {
                            self.delegate?.applicationAdIdsLoaded(advertisementIds: advertisementIds, oldAdvertisementIds:oldAdvertisementIds, offeredAdvertisementIds: offeredAdvertisementIds, oldOfferedAdvertisementIds: oldOfferedAdvertisementIds)
                            self.delegate?.applicationsToRemoveLoaded(advertisementIds: applicationsToRemove)
                        }
                    }
                    DispatchQueue.main.async {
                        let applicationsToRemove: [Int] = []
                        self.delegate?.applicationsToRemoveLoaded(advertisementIds: applicationsToRemove)
                    }
                } else {
                    self.loadedUser = try! decoder.decode(LoadedUser.self, from: data!)
                }
                //print("User loaded")
                
                DispatchQueue.main.async {
                    self.delegate?.fillUI()
                }
            }
            dataTask.resume()
            // Send token to your backend via HTTPS
            // ...
        }
    }
    
    
    func uploadImage(image: UIImage){
        
//        var headers : HTTPHeaders = [
//            "Content-type": "multipart/form-data"
//        ]
        
        guard let imageData = image.jpegData(compressionQuality: 0.7) else{return}
        print("ProfileImageData before uploading: \(imageData)")
        
        var multiPartFormData = MultipartFormData()
        multiPartFormData.append(imageData, withName: "file", fileName: "image.jpeg", mimeType: "image/jpeg")
        
        print("Data lenght: \(multiPartFormData.contentLength)")
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true, completion: { (idToken, error) in
            let headers : HTTPHeaders = [
                "auth": idToken!,
                "Content-type": "multipart/form-data"
            ]
            
            AF.upload(
                multipartFormData: multiPartFormData,
                to: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/upload", method: .post , headers: headers)
                .responseJSON { (resp) in
                    print(resp);
            }
//                .response{ response in
//                    debugPrint(response)
//            }
        })
        
    }
    
    
    
    
    
    
    func updateProfile(name: String, surname: String, profession: Int, newSkills: [Skill], deletedSkills: [Skill], birthDate: String){
        
        self.delegate?.showLoadingScreen()
        
        userUpdateRequest = UserUpdateRequest(birthDate: birthDate, name: name, surname: surname, profession: profession, newExperiences: [], deletedExperiences: [], newSkills: newSkills, deletedSkills: deletedSkills)
        let session = URLSession.shared
        
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/")!)
        request.httpMethod = "PATCH"
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
            if let error = error {
                // Handle error
                return;
            }
            //print(self.userUpdateRequest)
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            guard let uploadData = try? JSONEncoder().encode(self.userUpdateRequest) else{
                return
            }
            //print("HERE: \(String.init(data: uploadData, encoding: .utf8))")
            let uploadTask = session.uploadTask(with: request, from: uploadData) { (data, response, error) in
                if error == nil{
                    print("Profile created")
                    DispatchQueue.main.async{
                        self.delegate?.showProfileUpdatedLabel()
                    }
                } else{
                    print(error)
                }
                DispatchQueue.main.async {
                    self.delegate?.closeLoadingScreen()
                }
            }
            uploadTask.resume()
            // Send token to your backend via HTTPS
            // ...
        }
    }
}


