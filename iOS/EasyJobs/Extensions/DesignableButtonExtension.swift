//
//  UIButtonExtension.swift
//  EasyJobs
//
//  Created by Diablito on 16.12.2019.
//  Copyright © 2019 Diablito. All rights reserved.
//

import UIKit

extension DesignableButton{
    
    func load(url: URL){
        DispatchQueue.global().async {
            [weak self] in
            if let data = try? Data(contentsOf: url){
                if let image = UIImage(data: data){
                    DispatchQueue.main.async {
                        self?.setImage(image, for: .normal)
                    }
                }
            }
        }
    }
}

