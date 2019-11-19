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

extension ViewController: UserHelperDelegate{
    func goToMenu() {}
    func showSignUpError(error: String) {
        errorLabel.text = error
        errorLabel.alpha = 1
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
        //userHelper.delegate = self 
    }
    
    func setUpElements () {
        
        errorLabel.alpha = 0
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    func validate() -> String? {
        
        // Check if textfields are filled
        if
            nameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            surnameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            phoneNumberTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            emailTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == ""
            {
            return "Please fill in all fields"
        }
        
        
        return nil
    }
    
    
    @IBAction func signUpButtonTapped(_ sender: Any) {
        
        let error = validate()
        //var goToProfile =  false
        
        if error != nil{
            showError(error!)
        } else {
            
            let name = nameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let surname = surnameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let phoneNumber = phoneNumberTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let email = emailTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let password = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            
            userHelper.signUp(password: password, email: email, phoneNumber: phoneNumber, name: name, surname: surname)
            
 /*           var user = UserSignUpRequest(password: password, email: email, phoneNumber: phoneNumber, name: name, surname: surname)
            
            var signUpFinished = 0
            
            user.signUp(user: user) { (success) in
                if success{
                    goToProfile = true
                    print("User created")
                    signUpFinished = 1
                }else{
                    goToProfile = false
                    self.showError("User can`t be created!")
                    signUpFinished = 1
                }
            }
            while signUpFinished == 0 {}
            if goToProfile{
                Auth.auth().signIn(withEmail: email, password: password) { (loginResult, loginError) in
                     if loginError == nil{
                       print("User signed in")
                  }
                }
                self.goToProfile()
            }
            
  
            Auth.auth().createUser(withEmail: email, password: password) { (authResult, authError) in
                
                if authError != nil{
                    self.showError("User couldn`t be created")
                } else {
                    self.goToProfile()
                }
                 
            }*/
            
        }
        
    }
    func goToProfile(){
        let profileViewController = storyboard?.instantiateViewController(identifier: "ProfileVC") as? ProfileViewController
        view.window?.rootViewController = profileViewController
        view.window?.makeKeyAndVisible()
    }
    func showError(_ message: String){
        errorLabel.text = message
        errorLabel.alpha = 1
    }
    
}
