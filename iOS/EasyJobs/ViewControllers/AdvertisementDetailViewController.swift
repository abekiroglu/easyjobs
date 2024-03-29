//
//  AdvertisementDetailViewController.swift
//  EasyJobs
//
//  Created by Diablito on 2.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit


extension AdvertisementDetailViewController: AdvertisementDataSourceDelegate{
    func jobApplied() {
        applyButton.setTitle("Already Applied!", for: .normal)
        applyButton.isEnabled = false
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
    
    var advertisement: SimpleAdvertisement?
    let advertisementDataSource = AdvertisementDataSource()
    let userHelper = UserHelper()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        userHelper.loadUser()
        advertisementDataSource.delegate = self
        
        companyLabel.adjustsFontSizeToFitWidth = true
        companyEmailLabel.adjustsFontSizeToFitWidth = true
     
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
        if let selectedAdvertisement =  advertisement{
            //companyImage = advertisement.company.picture
            advertisementIDLabel.text = "\(selectedAdvertisement.id)"
            matchRateLabel.text = "\(selectedAdvertisement.matchRate)"
            companyLabel.text = selectedAdvertisement.company.name
            publishDateLabel.text = selectedAdvertisement.publishDate
            validUntilLabel.text = selectedAdvertisement.validUntil
            companyEmailLabel.text = selectedAdvertisement.company.email
            descriptionTextView.text = "Description: \(selectedAdvertisement.description)"
            if let url = URL(string: selectedAdvertisement.company.picture){
                companyImage.load(url: url)
            }
            
            
            if selectedAdvertisement.matchRate < 0.61{
                matchRateLabel.textColor = UIColor.orange
            }else if selectedAdvertisement.matchRate < 0.81 {
                matchRateLabel.textColor = UIColor.green
            }else{
                matchRateLabel.textColor = UIColor.yellow
            }
            matchRateLabel.alpha = 0.6
        }
    }
    
    @IBAction func applyButtonTapped(_ sender: Any) {
            if let selectedAdvertisement = advertisement{
                advertisementDataSource.applyForJob(advertisementID: selectedAdvertisement.id)
        }
    }
    
    func setCompanyImage(image: UIImage){
        companyImage.image = image
    }
    
}
