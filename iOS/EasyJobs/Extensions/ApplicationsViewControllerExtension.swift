//
//  ApplicationsViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 14.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension ApplicationsViewController{
    func getApplications(advertisementIds: [Int], advertisements: [SimpleAdvertisement]) -> [SimpleAdvertisement] {
        var applicationsList: [SimpleAdvertisement] = []
        
        for advertisementId in advertisementIds{
            for advertisement in advertisements{
                if advertisementId == advertisement.id{
                    applicationList.append(advertisement)
                }
            }
        }
        
        return applicationList
    }
}
