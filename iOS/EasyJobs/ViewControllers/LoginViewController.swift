//
//  ViewController.swift
//  EasyJobs
//
//  Created by Diablito on 30.10.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import FirebaseAuth


class ViewController: UIViewController{

    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var loginButton: UIButton!
    @IBOutlet weak var signUpButton: UIButton!
    let utilities = Utilities()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        errorLabel.alpha = 0
    }
        
    @IBAction func loginButtonTapped(_ sender: Any) {
        let email = emailTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        let password = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        Auth.auth().signIn(withEmail: email, password: password) { (loginResult, loginError) in
            if loginError != nil{
                self.errorLabel.text = "Wrong email or password"
                self.errorLabel.alpha = 1
            } else{
                //self.goToMenu()
                let currentUser = Auth.auth().currentUser
                currentUser?.getIDToken{ idToken, error in
                  if let error = error {
                    print("User not signed in")
                    // Handle error
                    return;
                  }else{
                    print(idToken)
                    
                    }
                }
            }
        }
    }
/*    func goToMenu(){
        let menuVC:MenuViewController = self.storyboard?.instantiateViewController(withIdentifier: "MenuVC") as! MenuViewController
        let nvc:UINavigationController = self.storyboard?.instantiateViewController(withIdentifier: "NC") as! UINavigationController
        nvc.viewControllers = [menuVC]
        nvc.popToRootViewController(animated:true)
        let controllers: [UIViewController] = nvc.viewControllers
        if let controllerName: String =  controllers[0].title{
            print(controllerName)}
    }*/
    
}

