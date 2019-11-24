//
//  DesignableTextField.swift
//  EasyJobs
//
//  Created by Diablito on 23.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

@IBDesignable class DesignableTextField: UITextField {

    @IBInspectable var cornerRadius: CGFloat = 0.0 {
        didSet{
            self.layer.cornerRadius = cornerRadius
            self.clipsToBounds = true
        }
    }
    
    @IBInspectable var borderWidth: CGFloat = 0.0 {
        didSet{
            self.layer.borderWidth =  borderWidth
        }
    }
    
    @IBInspectable var borderColor: UIColor = UIColor.clear {
        didSet{
            self.layer.borderColor = borderColor.cgColor
        }
    }
}
