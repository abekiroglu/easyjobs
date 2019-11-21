//
//  AdvertisementViewController.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class AdvertisementViewController: UIViewController {

    
    let advertisementDataSource = AdvertisementDataSource()
    override func viewDidLoad() {
        super.viewDidLoad()
        advertisementDataSource.loadAdvertisementList()
    }
    

   

}
