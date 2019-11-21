//
//  MenuViewController.swift
//  EasyJobs
//
//  Created by Diablito on 4.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase


class MenuViewController: UIViewController {
    
    
    @IBOutlet weak var bgImage: UIImageView!
    @IBOutlet weak var welcomeLabel: UILabel!
    @IBOutlet weak var advertisementsButton: DesignableButton!
    @IBOutlet weak var applicationsButton: DesignableButton!
    @IBOutlet weak var profileButton: DesignableButton!
    @IBOutlet weak var logOutButton: DesignableButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        bgImage.alpha = 0
        welcomeLabel.alpha = 0
        advertisementsButton.alpha = 0
        applicationsButton.alpha = 0
        profileButton.alpha = 0
        logOutButton.alpha = 0

    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        UIView.animate(withDuration: 1, animations: {
            self.bgImage.alpha = 0.6
        }) { (true) in
            self.showLabel()
        }
    }
  

}
