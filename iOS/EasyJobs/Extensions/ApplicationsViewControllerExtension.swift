//
//  ApplicationsViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 14.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension ApplicationsViewController{
    
    func getApplications(advertisementIds: [Int], advertisements: [SimpleAdvertisement]) -> [SimpleAdvertisement] {/*
        print("Inside getApplications: AdvertisementIds of Apps:")
        for advertisementId in advertisementIds{
            print("Advertisement: \(advertisementId)")
        }
        print("Application, advertisement adIds: ")
        for advertisement in advertisements{
            print("AdvertisementiD: \(advertisement.id)")
        }*/
        var applicationsList: [SimpleAdvertisement] = []
        if advertisementIds.count>0 && advertisements.count>0{
            for i in 0...advertisements.count-1{
                var addElement = false
                for j in 0...advertisementIds.count-1{
                    if advertisements[i].id == advertisementIds[j]{
                        addElement = true
                        //print("Advertisement: \(advertisementIds[j]) added")
                    }
                }
                if addElement{
                    applicationsList.append(advertisements[i])
                }
            }
        }
        
        return applicationsList
    }
    func getApplication(applicationList: [JobApplication], adId: Int) -> JobApplication{
        var applicationx = applicationList[0]
        for application in applicationList{
            if application.advertisementId == adId {
                applicationx = application
            }
        }
        return applicationx
    }
}
