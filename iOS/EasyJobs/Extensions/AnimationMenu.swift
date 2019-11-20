//
//  AnimationMenu.swift
//  EasyJobs
//
//  Created by Diablito on 20.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension AnimationViewController {
    
    func toggleMenu(){
        if darkFillView.transform == CGAffineTransform.identity {
        UIView.animate(withDuration: 1, animations: {
            self.darkFillView.transform = CGAffineTransform(scaleX: 11, y: 11)
            self.menuView.transform = CGAffineTransform(translationX: 0, y: -100)
            self.toggleButton.transform = CGAffineTransform(rotationAngle: self.radians(180))
        }) { (true) in
             
            }
        }else{
            UIView.animate(withDuration: 1, animations: {
                self.darkFillView.transform = CGAffineTransform.identity
                self.menuView.transform = CGAffineTransform.identity
                self.toggleButton.transform = CGAffineTransform.identity
            }) { (true) in
                
            }
        }
    }
    
    func radians(_ degrees: Double) -> CGFloat {
        
        let num : Double = degrees * .pi / degrees
        return CGFloat(num)
        
    }
    
}
