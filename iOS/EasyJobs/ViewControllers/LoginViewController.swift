//
//  ViewController.swift
//  EasyJobs
//
//  Created by Diablito on 30.10.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import FirebaseAuth


class LoginViewController: UIViewController{
    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var contentView: UIView!
    
    @IBOutlet var loadingView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        errorLabel.alpha = 0
        
        
    }
        
    @IBAction func dismiss(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        login()
    }
    
    
}

