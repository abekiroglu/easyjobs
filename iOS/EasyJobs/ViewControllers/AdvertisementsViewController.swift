//
//  AdvertisementsViewController.swift
//  EasyJobs
//
//  Created by Diablito on 14.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class AdvertisementsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func backButtonTapped(_ sender: Any) {
        
        self.goToMenu()
    }
    
    
    
    
    func goToMenu(){
        let menuViewController = storyboard?.instantiateViewController(identifier: "MenuVC") as? MenuViewController
        view.window?.rootViewController = menuViewController
        view.window?.makeKeyAndVisible()
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
