//
//  WelcomeViewController.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase

class WelcomeViewController: UIViewController {
    
    
    @IBOutlet weak var bgImage: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        bgImage.alpha = 0.7
        
        let user = Auth.auth().currentUser
        if(user != nil){
            let menuViewController = storyboard?.instantiateViewController(identifier: "MenuVC") as! MenuViewController
            if let navigationController = UIApplication.shared.keyWindow?.rootViewController as? UINavigationController{
                navigationController.setViewControllers([menuViewController], animated: true)
                self.dismiss(animated: true)
            }
        }
    }
 
}
