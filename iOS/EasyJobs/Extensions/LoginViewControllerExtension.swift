//
//  LoginViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

extension LoginViewController{
    
    func login(){
        let email = emailTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        let password = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        Auth.auth().signIn(withEmail: email, password: password) { (loginResult, loginError) in
            if loginError != nil{
                self.errorLabel.text = "Wrong email or password"
                self.errorLabel.alpha = 1
            } else{
                let currentUser = Auth.auth().currentUser
                currentUser?.getIDToken{ idToken, error in
                  if let error = error {
                    print("User not signed in")
                    // Handle error
                    return;
                  }else{
                    print(idToken)
                    self.goToMenu()
                    }
                }
            }
        }
    }
    
    func goToMenu() {
        let menuViewController = storyboard?.instantiateViewController(identifier: "MenuVC") as! MenuViewController
      //  view.window?.rootViewController = menuViewController
        //view.window?.makeKeyAndVisible()
        let nav = self.presentingViewController as! UINavigationController
        nav.setViewControllers([menuViewController], animated: true)
        self.dismiss(animated: true) {
            
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
