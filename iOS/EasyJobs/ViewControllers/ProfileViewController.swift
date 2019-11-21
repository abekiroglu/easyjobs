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
        arrangeSkills(professionName: dataSource[row])
        
        // Get skills and put them in selectors
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return dataSource[row]
    }
}

class ProfileViewController: UIViewController {
    
    
    @IBOutlet weak var cardLabel: UILabel!
    @IBOutlet weak var editInformationLabel: UILabel!
    @IBOutlet weak var contentView: UIView!
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
    @IBOutlet weak var cardView: UIView!
    @IBOutlet weak var tickImageView: UIImageView!
    @IBOutlet weak var saveButton: DesignableButton!
    
    private let dataSource : [String] = ["Please choose a profession","Software Developer"]
    private var datePicker: UIDatePicker?
    private var professionPicker: UIPickerView?
    var skillNum : Int = 0
    var skills : [Bool] = [false,false,false]
    var skillNames : [String] = []
    
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
    
    
    @IBAction func panCard(_ sender: UIPanGestureRecognizer) {
        let card = sender.view!
        let translation = sender.translation(in: view)
        let xFromCenter = card.center.x - view.center.x
        card.center = CGPoint(x: view.center.x + translation.x, y: view.center.y + translation.y)
        
        if xFromCenter > 0 {
            // image tick
            tickImageView.tintColor = UIColor.green
        } else {
            // image cross
            tickImageView.tintColor = UIColor.red
        }
        
        tickImageView.alpha = abs(xFromCenter) / view.center.x
        
        if sender.state == UIGestureRecognizer.State.ended{
            
            
            
            if card.center.x > self.view.center.x * 2{
                // Move card to the right side
                 self.skills[self.skillNum] = true
                if(skillNum == 2){
                    UIView.animate(withDuration: 1) {
                        card.center = CGPoint(x: card.center.x + 200, y: card.center.y + 75)
                        card.alpha = 0
                    }
                    setupSelecters()
                    self.skillNum = 0
                }else{
                    UIView.animate(withDuration: 1, animations: {
                        card.center = CGPoint(x: card.center.x + 200, y: card.center.y + 75)
                        card.alpha = 0
                    }) { (true) in
                        
                        self.skillNum += 1
                        self.tickImageView.alpha = 0
                        UIView.animate(withDuration: 1) {
                            self.cardView.center = self.view.center
                            self.cardView.alpha = 1
                            self.cardLabel.text = self.skillNames[self.skillNum]
                        }
                        
                    }
                }
            } else if card.center.x < 0 {
                self.skills[skillNum] =  false
                if (skillNum == 2){
                // Move card to the left side
                    UIView.animate(withDuration: 1) {
                        card.center = CGPoint(x: card.center.x - 200, y: card.center.y + 75)
                        card.alpha = 0
                    }
                    setupSelecters()
                    self.skillNum = 0
                } else{
                    UIView.animate(withDuration: 1, animations: {
                         card.center = CGPoint(x: card.center.x - 200, y: card.center.y + 75)
                         card.alpha = 0
                    }) { (true) in
                        self.skillNum += 1
                        self.tickImageView.alpha = 0
                        UIView.animate(withDuration: 1) {
                            self.cardView.center = self.view.center
                            self.cardView.alpha = 1
                            self.cardLabel.text = self.skillNames[self.skillNum]
                        }
                        
                    }
                }
            } else{
        UIView.animate(withDuration: 0.5) {
            card.center.x = self.view.center.x
            card.center.y = self.view.center.y
            self.tickImageView.alpha = 0
                }
            }
           // card.center.x = self.view.center.x
            //card.center.y = self.view.center.y
        }
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
        
    
}
