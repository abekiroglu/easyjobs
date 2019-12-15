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
    func applicationAdIdsLoaded(advertisementIds: [Int])
}

extension UserHelperDelegate{
    func goToMenu(){}
    func showSignUpError(error: String){}
    func showLoadingScreen(){}
    func closeLoadingScreen(){}
    func showProfileUpdatedLabel(){}
    func fillUI(){}
    func applicationAdIdsLoaded(advertisementIds: [Int]){}
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
             //print("HERE: \(String.init(data: data!, encoding: .utf8))")
             let decoder = JSONDecoder()
                //print("Loading User")
                //print(data!.count)
                if data!.count > 500 {
                    self.bigLoadedUser = try! decoder.decode(LoadUserUser.self, from: data!)
                    self.bigUser = true
                    if self.bigLoadedUser.applications.count>0{
                        print("There are applications")
                        var advertisementIds : [Int] = []
                        for application in self.bigLoadedUser.applications{
                            advertisementIds.append(application.advertisementId)
                        }
                        print("Loading applications")
                        DispatchQueue.main.async {
                            self.delegate?.applicationAdIdsLoaded(advertisementIds: advertisementIds)
                        }
                        
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
        print("uploading Image")
        let parameters : [String: String] = [:]
        let boundary =  generateBoundary()
        //parameters = ["name": "MyProfile32513"]
        guard let mediaImage = Media(image: image, key: "file") else {return}
        
        guard let url = URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/upload") else {return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        let dataBody = createDataBody(params: nil, media: [mediaImage], boundary: boundary)
        let str = String(decoding: dataBody, as: UTF8.self)
        print(str)
        request.httpBody = dataBody
        
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true) { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            
            request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            
            let session = URLSession.shared
            print("Task started")
            session.dataTask(with: request) { (data, response, error) in
                if let response = response {
                    print(response)
                }
                if let data = data {
                    do {
                        let json = try JSONSerialization.jsonObject(with: data, options: [])
                        print(json)
                    } catch {
                        print(error)
                    }
                }
            }.resume()
        }
    }
    
    func generateBoundary() -> String{
        return "Boundary-\(NSUUID().uuidString)"
    }
    
    func createDataBody(params: [String: String]?, media: [Media]?, boundary: String) -> Data{
        
        print("Creating body")
        let linebreak = "\r\n"
        var body = Data()
        
        if let parameters =  params {
            print("There are params")
            for (key,value) in parameters{
                body.append("--\(boundary + linebreak)")
                body.append("Content-Disposition: form-data; name=\"\(key)\"\(linebreak + linebreak)")
                body.append("\(value + linebreak)")
            }
        }
        
        if let image =  media {
            for photo in image {
                body.append("--\(boundary + linebreak)")
                body.append("Content-Disposition: form-data; name=\"\(photo.key)\"; filename =\"\(photo.filename)\"\(linebreak)")
                body.append("Content-Type: \(photo.mimeType + linebreak + linebreak)")
                body.append(photo.data)
                body.append(linebreak)
                print("BODY CREATED")
            }
            
            body.append("--\(boundary)--\(linebreak)")
        }
        
        return body
    }
 
    func UploadImageWithAlamofire(image: UIImage){
        
        var headers : HTTPHeaders = [
            "Content-type": "multipart/form-data"
        ]
        
        guard let imageData = image.jpegData(compressionQuality: 0.7) else{return}
        print("ProfileImageData before uploading: \(imageData)")
    
        var multiPartFormData = MultipartFormData()
        multiPartFormData.append(imageData, withName: "file", fileName: "image.jpeg", mimeType: "image/jpeg")
        
        print("Data lenght: \(multiPartFormData.contentLength)")
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDTokenForcingRefresh(true, completion: { (idToken, error) in
                headers = [
                "auth": idToken!,
                "Content-type": "multipart/form-data"
            ]
        })
        AF.upload(
            multipartFormData: multiPartFormData,
            to: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/users/upload", method: .post , headers: headers)
            .response{ response in
                debugPrint(response)
            }
        }

        
    
    
    
    
    func updateProfile(name: String, surname: String, profession: Int, newSkills: [Skill], deletedSkills: [Skill]){
        
            self.delegate?.showLoadingScreen()
        
        userUpdateRequest = UserUpdateRequest(birthDate: nil, name: name, surname: surname, profession: profession, newExperiences: [], deletedExperiences: [], newSkills: newSkills, deletedSkills: deletedSkills)
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
    

