//
//  SignUpViewController.swift
//  EasyJobs
//
//  Created by Diablito on 4.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import FirebaseAuth
import Firebase

extension SignUpViewController: UserHelperDelegate{
    func goToMenu() {/*
        let menuViewController = storyboard?.instantiateViewController(identifier: "MenuVC") as? MenuViewController
        view.window?.rootViewController = menuViewController
        view.window?.makeKeyAndVisible()*/
    }
    func showSignUpError(error: String) {/*
        errorLabel.text = error
        errorLabel.alpha = 1*/
    }
}

class SignUpViewController: UIViewController {

    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var surnameTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var signUpButton: UIButton!
    
    let userHelper = UserHelper()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        setUpElements()
        userHelper.delegate = self
    }

    
    @IBAction func dismiss(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func signUpButtonTapped(_ sender: Any) {
        signUp()
    }
    
    
}
