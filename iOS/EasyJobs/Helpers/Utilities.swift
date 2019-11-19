//
//  Utilities.swift
//  EasyJobs
//
//  Created by Diablito on 4.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import Foundation
import UIKit

class Utilities {
    
    init(){}
    
    func isPasswordValid(_ password : String) -> Bool{
        let passwordTest = NSPredicate(format: "SELF MATCHES %@", "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$")
        return passwordTest.evaluate(with: password)
    }
}
