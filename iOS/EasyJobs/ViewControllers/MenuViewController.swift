//
//  MenuViewController.swift
//  EasyJobs
//
//  Created by Diablito on 4.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase

extension MenuViewController: UserHelperDelegate{
    func fillUI(){
        print("Username is: \(userHelper.bigLoadedUser.name)")
        print("Filling Username")
        if self.userHelper.bigUser{
            self.welcomeLabel.text = "\(self.userHelper.bigLoadedUser.name)"
            if let picture = userHelper.bigLoadedUser.picture{
                if let url = URL(string: picture){
                    profileButton.load(url: url)
                }
            }
        }else{
            self.welcomeLabel.text = "\(self.userHelper.loadedUser.name)"
        }
    }
}

class MenuViewController: UIViewController {
    
    
    @IBOutlet weak var bgImage: UIImageView!
    @IBOutlet weak var welcomeLabel: UILabel!
    @IBOutlet weak var advertisementsButton: DesignableButton!
    @IBOutlet weak var applicationsButton: DesignableButton!
    @IBOutlet weak var profileButton: DesignableButton!
    @IBOutlet weak var logOutButton: DesignableButton!
    
    var userHelper = UserHelper()

    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        userHelper.loadUser()
        userHelper.delegate = self
        
        if view.bounds.height<600{
            print("It is shorter")
            profileButton.bounds.size.height = 90
            profileButton.bounds.size.width = 90
            print("Height: \(profileButton.bounds.size.height)")
            print("Width: \(profileButton.bounds.size.width)")
            profileButton.cornerRadius = profileButton.bounds.size.width / 2
        }

    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        /*UIView.animate(withDuration: 0.2, animations: {
            self.bgImage.alpha = 0.4
        }) { (true) in
            self.showProfile()
        }*/
        
    }
  
    @IBAction func logOutButtonTapped(_ sender: Any) {
        logOut()
    }
    
    
}
