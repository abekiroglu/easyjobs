//
//  ApplicationDetailViewController.swift
//  EasyJobs
//
//  Created by Diablito on 14.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit



extension ApplicationDetailViewController: UserHelperDelegate{
    func jobAccepted() {
        offerView.alpha = 0
        applyButton.isEnabled = false
        applyButton.setTitle("Accepted", for: .normal)
        resolvedLabel.text = "True"
    }
    func applicationCanceled() {
        offerView.alpha = 0
        applyButton.isEnabled = false
        applyButton.setTitle("Declined", for: .normal)
        resolvedLabel.text = "True"
    }
}

class ApplicationDetailViewController: UIViewController {
    
    @IBOutlet weak var offerView: UIView!
    @IBOutlet weak var companyImage: UIImageView!
    
    @IBOutlet weak var resolvedLabel: UILabel!
    @IBOutlet weak var advertisementIDLabel: UILabel!
    @IBOutlet weak var matchRateLabel: UILabel!
    @IBOutlet weak var companyLabel: UILabel!
    @IBOutlet weak var publishDateLabel: UILabel!
    @IBOutlet weak var validUntilLabel: UILabel!
    
    @IBOutlet weak var companyEmailLabel: UILabel!
    
    @IBOutlet weak var descriptionTextView: UITextView!
    
    @IBOutlet weak var applyButton: DesignableButton!
  
    @IBOutlet weak var feedbackTextView: DesignableTextView!
    
    /*
    @IBOutlet weak var companyImage: UIImageView!
    @IBOutlet weak var advertisementIDLabel: UILabel!
    @IBOutlet weak var matchRateLabel: UILabel!
    @IBOutlet weak var companyLabel: UILabel!
    @IBOutlet weak var publishDateLabel: UILabel!
    @IBOutlet weak var validUntilLabel: UILabel!
    @IBOutlet weak var companyEmailLabel: UILabel!
    @IBOutlet weak var descriptionTextView: UITextView!
    @IBOutlet weak var applyButton: DesignableButton!
 */
    
    var advertisement: SimpleAdvertisement?
    let advertisementDataSource = AdvertisementDataSource()
    let userHelper = UserHelper()
    var application: JobApplication?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        userHelper.delegate = self
        userHelper.loadUser()
        companyEmailLabel.adjustsFontSizeToFitWidth = true
        companyLabel.adjustsFontSizeToFitWidth = true
      /*  if let isApplied = isAlreadyApplied{
            applyButton.setTitle("Cancel Application", for: .normal)
        }*/
        
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
        if let application = application{
            feedbackTextView.text =  "Feedback: \(application.feedback)"
            if application.issuedBy != "User" && application.resolved == false{
                applyButton.isEnabled = false
                offerView.alpha = 1
            }
            if application.resolved == true{
                offerView.alpha = 0
                resolvedLabel.text = "True"
                applyButton.isEnabled = false
                if application.accepted ==  true{
                    applyButton.setTitle("Accepted!", for: .normal)
                }else{
                    applyButton.setTitle("Declined", for: .normal)
                }
                
                
            }
        }
        
    }
    
    
    
    @IBAction func applyButtonTapped(_ sender: Any) {
        if applyButton.title(for: .normal) == "Apply!"{
            if let selectedAdvertisement = advertisement{
                advertisementDataSource.applyForJob(advertisementID: selectedAdvertisement.id)
            }
        }else{
            if let application = application {
                if application.issuedBy == "User"{
                    userHelper.cancelApplication(applicationId: application.id)
                    print("Application removed: appId: \(application.id)")
                }
                
            }
        }
    }
    
    
    @IBAction func acceptButton(_ sender: Any) {
        if let application = application{
            userHelper.acceptApplication(applicationId: application.id)
            print("Application accepted: appId: \(application.id)")
        }
    }
    
    @IBAction func declineButton(_ sender: Any) {
        if let application = application{
            userHelper.cancelApplication(applicationId: application.id)
            print("Application removed: appId: \(application.id)")
        }
    }
    
        
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        
    
}

