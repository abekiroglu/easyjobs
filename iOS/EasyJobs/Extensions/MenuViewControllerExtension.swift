//
//  MenuViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension MenuViewController{
    
    func showLabel(){
        UIView.animate(withDuration: 1, animations: {
            self.welcomeLabel.alpha = 1
        }) { (true) in
            self.showAdvertisements()
        }
    }
    
    func showAdvertisements(){
        UIView.animate(withDuration: 1, animations: {
            self.advertisementsButton.alpha = 1
        }) { (true) in
            self.showApplications()
        }
    }
    
    func showApplications(){
        UIView.animate(withDuration: 1, animations: {
            self.applicationsButton.alpha = 1
        }) { (true) in
            self.showProfile()
        }
    }
    
    func showProfile(){
        UIView.animate(withDuration: 1, animations: {
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
    
    func goToLogin(){
        let loginViewController = storyboard?.instantiateViewController(identifier: "LoginVC") as? LoginViewController
        view.window?.rootViewController = loginViewController
        view.window?.makeKeyAndVisible()
    }
}
