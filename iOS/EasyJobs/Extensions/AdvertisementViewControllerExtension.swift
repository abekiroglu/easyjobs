//
//  AdvertisementViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 14.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension AdvertisementViewController{

    
    func isAlreadyApplied(advertisementId: Int) -> Bool{
        if userHelper.bigUser && userHelper.bigLoadedUser.applications.count>0 {
            for application in userHelper.bigLoadedUser.applications{
                if application.advertisementId == advertisementId{
                    return true
                }
            }
        }
        return false
    }

    func removeApplications(advertisementIds: [Int], advertisements: [SimpleAdvertisement]) -> [SimpleAdvertisement]{
        var advertisementList: [SimpleAdvertisement] = []
        print("Advertisements: \(advertisements.count)")
        print("Applications: \(advertisementIds.count)")
        if advertisementIds.count>0{
            for i in 0...advertisements.count-1{
                var add: Bool = true
                for j in 0...advertisementIds.count-1 {
                    if advertisements[i].id == advertisementIds[j]{
                        add = false
                    }
                }
                if add{
                    advertisementList.append(advertisements[i])
                }
            }
            return advertisementList
        }
        
        print("Final Advertisements: \(advertisementList.count)")
        return advertisements
    }
}
