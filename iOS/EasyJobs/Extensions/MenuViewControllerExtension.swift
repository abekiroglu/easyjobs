//
//  MenuViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase


extension MenuViewController{
    
    func showLabel(){
        UIView.animate(withDuration: 0.5, animations: {
            self.welcomeLabel.alpha = 1
        }) { (true) in
            self.showAdvertisements()
        }
    }
    
    func showAdvertisements(){
        UIView.animate(withDuration: 0.5, animations: {
            self.advertisementsButton.alpha = 1
        }) { (true) in
            self.showApplications()
        }
    }
    
    func showApplications(){
        UIView.animate(withDuration: 0.5, animations: {
            self.applicationsButton.alpha = 1
        }) { (true) in
            self.showProfile()
        }
    }
    
    func showProfile(){
        UIView.animate(withDuration: 0.5, animations: {
            self.profileButton.alpha = 1
        }) { (true) in
            self.showLogOut()
        }
    }
    
    func showLogOut(){
        UIView.animate(withDuration: 0.5) {
            self.logOutButton.alpha = 1
        }
    }
    
    func logOut(){
      /*  let welcomeViewController = storyboard?.instantiateViewController(identifier: "WelcomeVC") as! WelcomeViewController
        //  view.window?.rootViewController = menuViewController
          //view.window?.makeKeyAndVisible()
        let nav = self.view.window?.rootViewController?.navigationController as! UINavigationController
          nav.setViewControllers([welcomeViewController], animated: true)
          self.dismiss(animated: true)*/
          }
}
