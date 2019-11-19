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

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    
    func goToLogin(){
        let ViewController = storyboard?.instantiateViewController(identifier: "LoginVC") as? ViewController
        view.window?.rootViewController = ViewController
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
