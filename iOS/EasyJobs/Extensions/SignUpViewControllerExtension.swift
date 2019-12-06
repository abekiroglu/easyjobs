//
//  SignUpViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 21.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension SignUpViewController{
    
    
    func setUpElements () {
           errorLabel.alpha = 0
       }
    
    func validate() -> String? {
           
           // Check if textfields are filled
           if
               nameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
               surnameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
               usernameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
               emailTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
               passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == ""
               {
               return "Please fill in all fields"
           }
           
           return nil
       }
       
       func signUp() {
           
           let error = validate()
           
           if error != nil{
               showError(error!)
           } else {
               
               let name = nameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
               let surname = surnameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
               let username = usernameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
               let email = emailTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
               let password = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
               
               userHelper.signUp(password: password, email: email, username: username, name: name, surname: surname)
            
            
           }
           
       }
       func showError(_ message: String){
           errorLabel.text = message
           errorLabel.alpha = 1
       }
}
