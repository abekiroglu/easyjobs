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
 /*       s1Selecter.isOn = false
        s2Selecter.isOn = false
        s3Selecter.isOn = false
        s1Selecter.isEnabled = false
        s2Selecter.isEnabled = false
        s3Selecter.isEnabled = false*/
        tickImageView.alpha = 0
        cardView.alpha = 0
        bgImage.alpha = 0.4
        
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
    
    
    func setupSelecters(){
        UIView.animate(withDuration: 0.5) {
         /*   self.skillLabel1.text = self.skillNames[0]
            self.skillLabel2.text = self.skillNames[1]
            self.skillLabel3.text = self.skillNames[2]
            self.s1Selecter.isOn = self.skills[0]
            self.s2Selecter.isOn = self.skills[1]
            self.s3Selecter.isOn = self.skills[2]
            self.s1Selecter.isEnabled = true
            self.s2Selecter.isEnabled = true
            self.s3Selecter.isEnabled = true*/
        }

    }
    
    func arrangeSkills(professionName: String){
        professionTextField.text = professionName
        if professionTextField.text != "Please choose a profession"{
            possibleSkills = professionDataSource.getSkills(profession: professionDataSource.getMatchingProfession(title: professionName, professionList: professionDataSource.professionList))
            
            
            UIView.animate(withDuration: 0.5) {
            self.cardView.center = self.view.center
            self.cardView.alpha = 1
                self.cardLabel.text = self.possibleSkills[self.skillNum].description
            }
        }
    }
    
}
