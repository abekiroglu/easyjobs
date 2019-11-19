//
//  TestViewController.swift
//  EasyJobs
//
//  Created by Diablito on 19.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class TestViewController: UIViewController {
    
    @IBOutlet weak var bgImage: UIImageView!
    @IBOutlet weak var welcomeLabel: UILabel!
    @IBOutlet weak var advertisementsLabel: UILabel!
    @IBOutlet weak var advertisementsButton: UIButton!
    @IBOutlet weak var applicationsLabel: UILabel!
    @IBOutlet weak var applicationsButton: UIButton!
    @IBOutlet weak var profileLabel: UILabel!
    @IBOutlet weak var profileButton: UIButton!
    @IBOutlet weak var logOutButton: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        bgImage.alpha = 0
        welcomeLabel.alpha = 0
        advertisementsLabel.alpha = 0
        advertisementsButton.alpha = 0
        applicationsLabel.alpha = 0
        applicationsButton.alpha = 0
        profileLabel.alpha = 0
        profileButton.alpha = 0
        logOutButton.alpha = 0
        // Do any additional setup after loading the view.
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        UIView.animate(withDuration: 1, animations: {
            self.bgImage.alpha = 0.6
        }) { (true) in
            self.showLabel()
        }
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    func showLabel(){
        UIView.animate(withDuration: 1, animations: {
            self.welcomeLabel.alpha = 1
        }) { (true) in
            self.showAdvertisements()
        }
    }
    
    func showAdvertisements(){
        UIView.animate(withDuration: 1, animations: {
            self.advertisementsLabel.alpha = 1
            self.advertisementsButton.alpha = 1
        }) { (true) in
            self.showApplications()
        }
    }
    
    func showApplications(){
        UIView.animate(withDuration: 1, animations: {
            self.applicationsLabel.alpha = 1
            self.applicationsButton.alpha = 1
        }) { (true) in
            self.showProfile()
        }
    }
    
    func showProfile(){
        UIView.animate(withDuration: 1, animations: {
            self.profileLabel.alpha = 1
            self.profileButton.alpha = 1
        }) { (true) in
            self.showLogOut()
        }
    }
    
    func showLogOut(){
        UIView.animate(withDuration: 1) {
            self.logOutButton.alpha = 1
        }
    }
    
    
}
