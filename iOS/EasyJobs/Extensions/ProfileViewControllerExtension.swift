//
//  ProfileViewControllerExtension.swift
//  EasyJobs
//
//  Created by Diablito on 20.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension ProfileViewController{
    
    @objc func viewTapped(gestureRecognizer: UITapGestureRecognizer){
        view.endEditing(true)
    }
    
    @objc func dateChanged(datePicker: UIDatePicker){
        let dateFormatter =  DateFormatter()
        dateFormatter.dateFormat = "MM/dd/yyyy"
        birthDateTextField.text = dateFormatter.string(from: datePicker.date)
        //view.endEditing(true)
    }
    
    func setUpElements () {
        errorLabel.alpha = 0
        s1Selecter.isOn = false
        s2Selecter.isOn = false
        s3Selecter.isOn = false
        s1Selecter.isEnabled = false
        s2Selecter.isEnabled = false
        s3Selecter.isEnabled = false
        tickImageView.alpha = 0
    }
    
    func validate() -> String? {
        // Check if textfields are filled
        if
            nameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            surnameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            birthDateTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            professionTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            experienceTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == ""
            {
            return "Please fill in all fields"
        }
        return nil
    }
    
    func showError(_ message: String){
            errorLabel.text = message
            errorLabel.alpha = 1
        }
    
        func goToMenu(){
            let menuViewController = storyboard?.instantiateViewController(identifier: "MenuVC") as? MenuViewController
            view.window?.rootViewController = menuViewController
            view.window?.makeKeyAndVisible()
        }
}
