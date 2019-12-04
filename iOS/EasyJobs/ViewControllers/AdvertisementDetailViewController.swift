//
//  AdvertisementDetailViewController.swift
//  EasyJobs
//
//  Created by Diablito on 2.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension AdvertisementDetailViewController: AdvertisementDataSourceDelegate{
    func advertisementDetailLoaded(advertisement: SimpleAdvertisement){
        
    }
    func jobApplied(){
        applyButton.setTitle("Cancel Application", for: .normal)
    }
}

class AdvertisementDetailViewController: UIViewController {
    
    @IBOutlet weak var companyImage: UIImageView!
    @IBOutlet weak var advertisementIDLabel: UILabel!
    @IBOutlet weak var matchRateLabel: UILabel!
    @IBOutlet weak var companyLabel: UILabel!
    @IBOutlet weak var publishDateLabel: UILabel!
    @IBOutlet weak var validUntilLabel: UILabel!
    @IBOutlet weak var companyEmailLabel: UILabel!
    @IBOutlet weak var descriptionTextView: UITextView!
    @IBOutlet weak var applyButton: DesignableButton!
    
    var advertisementID: Int?
    var advertisement: SimpleAdvertisement?
    let advertisementDataSource = AdvertisementDataSource()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        advertisementDataSource.delegate = self
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        /*
        if let selectedAdvertisementID = advertisementID{
        //advertisementDataSource.loadAdvertisementDetail(advertisementID: selectedAdvertisementID)
        }*/
        if let selectedAdvertisement =  advertisement{
            //companyImage = advertisement.company.picture
            advertisementIDLabel.text = "\(selectedAdvertisement.id)"
            matchRateLabel.text = "\(selectedAdvertisement.matchRate)"
            companyLabel.text = selectedAdvertisement.company.name
            publishDateLabel.text = selectedAdvertisement.publishDate
            validUntilLabel.text = selectedAdvertisement.validUntil
            companyEmailLabel.text = selectedAdvertisement.company.email
            descriptionTextView.text = "Description: \(selectedAdvertisement.description)"
            
            if selectedAdvertisement.matchRate < 0.41{
                matchRateLabel.textColor = UIColor.red
            }else if selectedAdvertisement.matchRate < 0.71 {
                matchRateLabel.textColor = UIColor.yellow
            }else{
                matchRateLabel.textColor = UIColor.blue
            }
            matchRateLabel.alpha = 0.6
        }
    }
    
    @IBAction func applyButtonTapped(_ sender: Any) {
        if applyButton.title(for: .normal) == "Apply!"{
            if let selectedAdvertisement = advertisement{
                advertisementDataSource.applyForJob(advertisementID: selectedAdvertisement.id)
            }
        }
    }
    
}
