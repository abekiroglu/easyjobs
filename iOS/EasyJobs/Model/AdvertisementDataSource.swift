//
//  AdvertisementDataSource.swift
//  EasyJobs
//
//  Created by Diablito on 11.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation
import Firebase

protocol AdvertisementDataSourceDelegate{
    func advertisementListLoaded(advertisementList: [SimpleAdvertisement])
    func advertisementDetailLoaded(advertisement: SimpleAdvertisement)
}

extension AdvertisementDataSourceDelegate{
    func advertisementListLoaded(advertisementList: [SimpleAdvertisement]) {}
    func advertisementDetailLoaded(advertisement: SimpleAdvertisement) {}
}

class AdvertisementDataSource{
    
    var delegate: AdvertisementDataSourceDelegate?

    
    init(){}
    
    
    
    func loadAdvertisementList(){
        
        let session = URLSession.shared
        
       /* var items = [URLQueryItem]()
        var myURL = URLComponents(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/advertisements/search?id&companyId")
        let param = ["id": nil, "companyId": nil] as [String : Any?]
        for (key, value) in param{
            items.append(URLQueryItem(name: key, value: nil))
        }
        myURL?.queryItems = items
        let query  = myURL?.url!.query
        request.httpBody = Data(query!.utf8)*/
        
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/advertisements/search?id&companyId")!)
        request.httpMethod = "GET"
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDToken() { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            let dataTask = session.dataTask(with: request) {(data, response, error) in
                print("HERE: \(String.init(data: data!, encoding: .utf8))")
                let decoder = JSONDecoder()
                var advertisementList = try! decoder.decode([SimpleAdvertisement].self, from: data!)
                print("AdvertisementsLoaded")
                DispatchQueue.main.async {
                    self.delegate?.advertisementListLoaded(advertisementList: advertisementList)
                }
                    }
          dataTask.resume()
          // Send token to your backend via HTTPS
          // ...
        }
    }
    
    func loadAdvertisementDetail(advertisementID: Int){
        
        let session = URLSession.shared
        
       /* var items = [URLQueryItem]()
        var myURL = URLComponents(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/advertisements/search?id&companyId")
        let param = ["id": nil, "companyId": nil] as [String : Any?]
        for (key, value) in param{
            items.append(URLQueryItem(name: key, value: nil))
        }
        myURL?.queryItems = items
        let query  = myURL?.url!.query
        request.httpBody = Data(query!.utf8)*/
        
        var request = URLRequest(url: URL(string: "http://ec2-18-197-78-52.eu-central-1.compute.amazonaws.com/v1/advertisements/\(advertisementID)/details")!)
        request.httpMethod = "GET"
        
        let currentUser = Auth.auth().currentUser
        currentUser?.getIDToken() { idToken, error in
          if let error = error {
            // Handle error
            return;
          }
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.addValue(idToken!, forHTTPHeaderField: "auth" )
            let dataTask = session.dataTask(with: request) {(data, response, error) in
                print("HERE: \(String.init(data: data!, encoding: .utf8))")
                let decoder = JSONDecoder()
                var advertisement = try! decoder.decode(SimpleAdvertisement.self, from: data!)
                print("AdvertisementDetailLoaded")
                DispatchQueue.main.async {
                    self.delegate?.advertisementDetailLoaded(advertisement: advertisement)
                }
                    }
          dataTask.resume()
          // Send token to your backend via HTTPS
          // ...
        }
    }
}
