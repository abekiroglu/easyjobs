//
//  AdvertisementDataSource.swift
//  EasyJobs
//
//  Created by Diablito on 11.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation


protocol AdvertisementDataSourceDelegate{
    func advertisementListLoaded(advertisementList: [Advertisement])
}

class AdvertisementDataSource{
    
    var delegate: AdvertisementDataSourceDelegate?
    
    var advertisementList :[SimpleAdvertisement] = []
    
    
    func loadAdvertisementList(){
      /*  let session = URLSession.shared
        
        var request = URLRequest(url: URL(string: "http://localhost:8080/v1/advertisements/:advertisement_id")!)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let dataTask = session.dataTask(with: request) {(data, response, error) in
            let decoder = JSONDecoder()
            let advertisementList = try! decoder.decode([Advertisement].self, from: data!)
            self.delegate?.advertisementListLoaded(advertisementList: advertisementList)
        }
        dataTask.resume()*/
        
      /*  for n in 1...10{
            let advertisement = SimpleAdvertisement(description: "XM is looking for ambitious software Developers ")
            advertisementList.append(advertisement)
        }*/
        
    }
}
