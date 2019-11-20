//
//  BounceButton.swift
//  EasyJobs
//
//  Created by Diablito on 20.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class BounceButton: UIButton {

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        
        self.transform = CGAffineTransform(scaleX: 1.1, y: 1.1)
        
        UIView.animate(withDuration: 0.5, delay: 0, options: .allowUserInteraction, animations: {
            self.transform = CGAffineTransform.identity
        }, completion: nil)
        super.touchesBegan(touches, with: event)
    }

}
