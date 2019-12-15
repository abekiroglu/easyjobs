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
            view.endEditing(true)
            arrangeSkills(professionName: professionTextField.text!)
        }
        // Get skills and put them in selectors
    }
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return dataSource[row]
    }
}

extension ProfileViewController: UserHelperDelegate{
 
    func showLoadingScreen(){
        
        loadingView.bounds.size.width = view.bounds.width - 25
        loadingView.bounds.size.height = view.bounds.height - 40
        loadingView.center = view.center
        view.addSubview(loadingView)
        
    }
    
    func closeLoadingScreen(){
        loadingView.removeFromSuperview()
    }
    
    func showProfileUpdatedLabel(){
        errorLabel.text = "Profile Updated"
        errorLabel.alpha = 1
        errorLabel.textColor = UIColor.green
        
    }
    func fillUI(){
        if userHelper.bigUser == true{
            nameTextField.text = userHelper.bigLoadedUser.name
            surnameTextField.text = userHelper.bigLoadedUser.surname
            professionTextField.text = userHelper.bigLoadedUser.profession.title
            oldSkills = userHelper.bigLoadedUser.skills
        }else{
            nameTextField.text = userHelper.loadedUser.name
            surnameTextField.text = userHelper.loadedUser.surname
            professionTextField.text = userHelper.loadedUser.profession.title
        }
    }
}

extension ProfileViewController: UIImagePickerControllerDelegate{
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        let image = info[UIImagePickerController.InfoKey.originalImage] as! UIImage
        
        profileImage.image = image
        
        userHelper.UploadImageWithAlamofire(image: profileImage.image!)
        
        picker.dismiss(animated: true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }
}



extension ProfileViewController: UINavigationControllerDelegate{
    
}


class ProfileViewController: UIViewController {
    
    
    @IBOutlet weak var skillImage: UIImageView!
    @IBOutlet weak var bgImage: UIImageView!
    @IBOutlet weak var cardLabel: UILabel!
    @IBOutlet weak var editInformationLabel: UILabel!
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var surnameTextField: UITextField!
    @IBOutlet weak var birthDateTextField: UITextField!
    @IBOutlet weak var professionTextField: UITextField!
    @IBOutlet weak var experienceTextField: UITextField!
    @IBOutlet weak var cardView: UIView!
    @IBOutlet weak var tickImageView: UIImageView!
    @IBOutlet weak var saveButton: DesignableButton!
    
    @IBOutlet weak var profileImage: DesignableImageView!
    
    
    
    @IBOutlet var loadingView: UIView!
    @IBOutlet weak var shineView: GradientView!
    
    
    
    private let dataSource : [String] = ["Please choose a profession","Software Developer"]
    private var datePicker: UIDatePicker?
    private var professionPicker: UIPickerView?
    var skillNum : Int = 0
    var possibleSkills : [Skill] = []
    var selectedSkills : [Skill] = []
    var oldSkills: [Skill] = []
    
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
        userHelper.loadUser()
        userHelper.delegate = self
        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
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
                self.selectedSkills.append(possibleSkills[skillNum])
                print("Skill \(selectedSkills.last?.description) added to selectedSkills")
                if(skillNum == possibleSkills.count-1){
                    UIView.animate(withDuration: 0.4) {
                        card.center = CGPoint(x: card.center.x + 200, y: card.center.y + 75)
                        card.alpha = 0
                    }
                    //setupSelecters()
                    self.skillNum = 0
                }else{
                    UIView.animate(withDuration: 0.4, animations: {
                        card.center = CGPoint(x: card.center.x + 200, y: card.center.y + 75)
                        card.alpha = 0
                    }) { (true) in
                        
                        self.skillNum += 1
                        self.tickImageView.alpha = 0
                        UIView.animate(withDuration: 1) {
                            self.cardView.center = self.view.center
                            self.cardView.alpha = 1
                            self.cardLabel.text = self.possibleSkills[self.skillNum].description
                        }
                        
                    }
                }
            } else if card.center.x < 0 {
                //self.skills[skillNum] =  false
                if (skillNum == possibleSkills.count-1){
                // Move card to the left side
                    UIView.animate(withDuration: 0.4) {
                        card.center = CGPoint(x: card.center.x - 200, y: card.center.y + 75)
                        card.alpha = 0
                    }
                    //setupSelecters()
                    self.skillNum = 0
                } else{
                    UIView.animate(withDuration: 0.4, animations: {
                         card.center = CGPoint(x: card.center.x - 200, y: card.center.y + 75)
                         card.alpha = 0
                    }) { (true) in
                        self.skillNum += 1
                        self.tickImageView.alpha = 0
                        UIView.animate(withDuration: 1) {
                            self.cardView.center = self.view.center
                            self.cardView.alpha = 1
                            self.cardLabel.text = self.possibleSkills[self.skillNum].description
                        }
                        
                    }
                }
            } else{
        UIView.animate(withDuration: 0.4) {
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
            
            
            let email = Auth.auth().currentUser?.email
            
            var professionInt: Int = 1
            
            if profession == "Software Developer" {
                professionInt = 2
            }
            
            var newSkills: [Skill] = []
            var deletedSkills: [Skill] = []
            
            if selectedSkills.count > 0{
                for i in 0...selectedSkills.count-1{
                    print("\(i)th selected skill: \(selectedSkills[i].description)")
                }
            }else{
                print("There is no selected skill")
            }
            
            if oldSkills.count > 0{
                for i in 0...oldSkills.count-1{
                    print("\(i)th old skill: \(oldSkills[i].description)")
                }
            }else{
                print("There is no old skill")
            }
            
            if userHelper.bigUser && oldSkills.count > 0 {
                newSkills = professionDataSource.getNewSkills(oldSkills: oldSkills, selectedSkills: selectedSkills)
                deletedSkills = professionDataSource.getDeletedSkills(oldSkills: oldSkills, selectedSkills: selectedSkills)
            }else{
                newSkills = selectedSkills
            }
            
            
            if newSkills.count > 0{
                for i in 0...newSkills.count-1{
                    print("\(i)th new skill: \(newSkills[i].description)")
                }
            }
            else{
                print("There is no new skill")
            }
            if deletedSkills.count > 0{
                for i in 0...deletedSkills.count-1{
                    print("\(i)th deleted skill: \(deletedSkills[i].description)")
                }
            }else{
                print("There is no deleted skill")
            }
            
            
            userHelper.updateProfile(name: name, surname: surname, profession: professionInt, newSkills: newSkills, deletedSkills: deletedSkills)
            oldSkills =  selectedSkills
            selectedSkills = []
            possibleSkills = []
        }
    }
    
    @IBAction func chooseImage(_ sender: Any) {
        
        let imagePickerController = UIImagePickerController()
        imagePickerController.delegate = self
        
        let actionSheet = UIAlertController(title: "Photo Source", message: "Choose a source", preferredStyle: .actionSheet)
            
        actionSheet.addAction(UIAlertAction(title: "PhotoLibrary", style: .default, handler: { (action: UIAlertAction) in
            imagePickerController.sourceType = .photoLibrary
            self.present(imagePickerController, animated: true, completion: nil)
        }))
        actionSheet.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        
        self.present(actionSheet, animated: true, completion: nil)
        
    }
    @IBAction func uploadImage(_ sender: Any) {
        
        let imageData = profileImage.image?.jpegData(compressionQuality: 0.7)
        print("ProfileImageData: \(imageData)")
        
        userHelper.UploadImageWithAlamofire(image: profileImage.image!)
    }
    
        
    
}
