//
//  AnimationViewController.swift
//  EasyJobs
//
//  Created by Diablito on 19.11.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

class AnimationViewController: UIViewController {
    
    @IBOutlet weak var menuView: UIView!
    @IBOutlet weak var darkFillView: DesignableView!
    @IBOutlet weak var toggleButton: UIButton!
    @IBOutlet weak var cardView: DesignableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    @IBAction func menuButtonTapped(_ sender: Any) {
        toggleMenu()
    }
    
    @IBAction func panCard(_ sender: UIPanGestureRecognizer) {
        
        let card = sender.view!
        let translation = sender.translation(in: view)
        card.center = CGPoint(x: view.center.x + translation.x, y: view.center.y + translation.y)
        
        if sender.state == UIGestureRecognizer.State.ended{
        UIView.animate(withDuration: 0.5) {
            card.center = self.view.center
            }
        }
    }
    
    
    
}
