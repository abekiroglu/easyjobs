//
//  ProfileViewController.swift
//  EasyJobs
//
//  Created by Diablito on 4.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit
import Firebase

extension ProfileViewController: UIPickerViewDelegate, UIPickerViewDataSource{
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return dataSource.count
    }
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        professionTextField.text = dataSource[row]
        if professionTextField.text != "Please choose a profession"{
            let skillList : [SimpleSkill] = professionDataSource.getMatchingProfession(title: dataSource[row], professionList: professionDataSource.professionList).skills
            skillLabel1.text = skillList[0].description
            skillLabel2.text = skillList[1].description
            skillLabel3.text = skillList[2].description
            s1Selecter.isEnabled = true
            s2Selecter.isEnabled = true
            s3Selecter.isEnabled = true
            s1Selecter.isOn = false
            s2Selecter.isOn = false
            s3Selecter.isOn = false
            s1Selecter.isEnabled = true
            s2Selecter.isEnabled = true
            s3Selecter.isEnabled = true
        } else{
            s1Selecter.isEnabled = false
            s2Selecter.isEnabled = false
            s3Selecter.isEnabled = false
            skillLabel1.text = "Skill1"
            skillLabel2.text = "Skill2"
            skillLabel3.text = "Skill3"
            
        }
        
        
        // Get skills and put them in selectors
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return dataSource[row]
    }
}

class ProfileViewController: UIViewController {
        
    
    @IBOutlet weak var skillLabel1: UILabel!
    @IBOutlet weak var skillLabel2: UILabel!
    @IBOutlet weak var skillLabel3: UILabel!
    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var surnameTextField: UITextField!
    @IBOutlet weak var birthDateTextField: UITextField!
    @IBOutlet weak var professionTextField: UITextField!
    @IBOutlet weak var experienceTextField: UITextField!
    @IBOutlet weak var s1Selecter: UISwitch!
    @IBOutlet weak var s2Selecter: UISwitch!
    @IBOutlet weak var s3Selecter: UISwitch!
    
    private let dataSource : [String] = ["Please choose a profession","Software Developer"]
    private var datePicker: UIDatePicker?
    private var professionPicker: UIPickerView?
    
    let professionDataSource = ProfessionDataSource()
    let userHelper = UserHelper()
    

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        datePicker = UIDatePicker()
        datePicker?.datePickerMode = .date
        datePicker?.addTarget(self, action: #selector(ProfileViewController.dateChanged(datePicker:)), for: .valueChanged)
        let tapGesture  = UITapGestureRecognizer(target: self, action: #selector(ProfileViewController.viewTapped(gestureRecognizer:)))
        view.addGestureRecognizer(tapGesture)
        birthDateTextField.inputView = datePicker
        
        professionPicker = UIPickerView()
        professionPicker?.dataSource = self
        professionPicker?.delegate = self
        let professiontapGesture  = UITapGestureRecognizer(target: self, action: #selector(ProfileViewController.viewTapped(gestureRecognizer:)))
        view.addGestureRecognizer(tapGesture)
        professionTextField.inputView = professionPicker
        
        
        setUpElements()
        professionDataSource.loadProfessionList()
        // Do any additional setup after loading the view.
    }
    
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
    
    @IBAction func saveButtonTapped(_ sender: Any) {
        
        let error = validate()
        var goToMenu =  false
        
        if error != nil{
            showError(error!)
        } else {
            
            let name = nameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let surname = surnameTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let birthDate = birthDateTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            var profession = professionTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            let experience = experienceTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
            
            profession = professionDataSource.professionList[1].title
            
            let email = Auth.auth().currentUser?.email
            
            let simpleProfessionObject : SimpleProfession = professionDataSource.getMatchingProfession(title: profession, professionList: professionDataSource.professionList)
            let professionObject = Profession(title: simpleProfessionObject.title)
            let simpleSkillList : [SimpleSkill] = professionDataSource.getSkills(profession: simpleProfessionObject)
            var skillList : [Skill] = []
            if s1Selecter.isOn {
                skillList.append(Skill(description: simpleSkillList[0].description))
            }
            if s2Selecter.isOn{
                skillList.append(Skill(description: simpleSkillList[1].description))
            }
            if s3Selecter.isOn{
                skillList.append(Skill(description: simpleSkillList[2].description))
            }
            
            
            userHelper.updateProfile(email: email!, birthDate: Date.init(), name: "Burak", surname: "Ozdemir", profession: professionObject, skills: skillList, experiences: [])
            
            self.goToMenu()
            
            
           /* var professionObject = Profession(title: "x", description: "x", skills: [], advertisements: [], isDeleted: false)
            
            let professions : [Profession] = professionObject.getProfessions()
            professionObject = professions[0]
            let skills : [Skill] = professionObject.skills
            var professionObject = Profession(title: "Software Developer")
            let skills = professionObject.skills
            
            var user = User(email: email!, isValidated: false, comments: [], applications: [], isDeleted: false, birthDate: Date.init(), name: name, surname: surname, profession: professionObject, skills: skills, experiences: [])
            
            user.createProfile(email: email!, birthDate: Date.init(), name: name, surname: surname, profession: professionObject, skills: skills, experiences: [])*/
            
            
        }
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
        

    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
